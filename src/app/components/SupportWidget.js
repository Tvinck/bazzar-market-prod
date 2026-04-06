'use client';

import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { supabase } from '../../lib/supabase';
import styles from './SupportWidget.module.css';

/* ═══════════════════════════════════════════════
   FAQ Data
   ═══════════════════════════════════════════════ */
const FAQ_ITEMS = [
  { q: 'Как происходит доставка?', a: 'После оплаты товар доставляется автоматически на вашу электронную почту или Telegram. Обычно это занимает от 1 до 30 минут в зависимости от товара.' },
  { q: 'Какие способы оплаты доступны?', a: 'Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), через СБП (Система быстрых платежей), а также КупиКоинами — нашей внутренней валютой с кешбэком.' },
  { q: 'Можно ли вернуть деньги?', a: 'Да, возврат возможен если товар не был доставлен. Напишите нам в Telegram @bazzar_support с номером заказа — обработаем запрос в течение 24 часов.' },
  { q: 'Безопасно ли покупать?', a: 'Абсолютно! Все платежи проходят через защищённые платёжные системы. Мы работаем как ИП с полным соблюдением законодательства РФ.' },
  { q: 'Как получить кешбэк?', a: 'Кешбэк начисляется автоматически после каждой покупки в виде КупиКоинов. 1 КупиКоин = 1 рубль. Используйте их при следующей покупке!' },
  { q: 'Что делать если товар не пришёл?', a: 'Подождите 30 минут — иногда доставка может задержаться. Если товар так и не пришёл, свяжитесь с нами через Telegram @bazzar_support.' },
];

const QUICK_MESSAGES = [
  { emoji: '📦', text: 'Проблема с заказом' },
  { emoji: '💳', text: 'Вопрос по оплате' },
  { emoji: '🔄', text: 'Запрос на возврат' },
  { emoji: '❓', text: 'Другой вопрос' },
];

/* ═══════════════════════════════════════════════
   Visitor ID — persistent across sessions
   ═══════════════════════════════════════════════ */
function getVisitorId() {
  if (typeof window === 'undefined') return 'ssr';
  let id = localStorage.getItem('bazzar_visitor_id');
  if (!id) {
    id = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('bazzar_visitor_id', id);
  }
  return id;
}

function getSavedChatId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('bazzar_chat_id');
}

function saveChatId(id) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bazzar_chat_id', id);
  }
}

/* ═══════════════════════════════════════════════
   Support Widget Component
   ═══════════════════════════════════════════════ */
function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('home'); // home | faq | faqDetail | chat
  const [faqIdx, setFaqIdx] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const subscriptionRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Subscribe to realtime messages when chat is active
  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel(`support_messages_${chatId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'support_messages',
        filter: `chat_id=eq.${chatId}`,
      }, (payload) => {
        const msg = payload.new;
        // Only show operator messages (visitor messages are already shown optimistically)
        if (msg.sender === 'operator') {
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(m => m.id === msg.id)) return prev;
            return [...prev, {
              id: msg.id,
              from: 'bot',
              text: msg.text,
              created_at: msg.created_at,
            }];
          });
          // Show notification if widget is closed
          if (!isOpen) {
            setHasNewMessage(true);
          }
        }
      })
      .subscribe();

    subscriptionRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, isOpen]);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      if (!prev) {
        setView('home');
        setHasNewMessage(false);
        // Check for existing chat session
        const savedId = getSavedChatId();
        if (savedId) {
          setChatId(savedId);
          // Load existing messages
          loadMessages(savedId);
        }
      }
      return !prev;
    });
  }, []);

  // Load messages from Supabase
  const loadMessages = async (cid) => {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('chat_id', cid)
        .order('created_at', { ascending: true });

      if (!error && data?.length > 0) {
        setMessages(data.map(m => ({
          id: m.id,
          from: m.sender === 'visitor' ? 'user' : 'bot',
          text: m.text,
          created_at: m.created_at,
          cta: false,
        })));
        setView('chat');
      }
    } catch (e) {
      console.warn('[Support] Failed to load messages:', e);
    }
  };

  const openFaq = useCallback((idx) => { setFaqIdx(idx); setView('faqDetail'); }, []);

  // Create or reuse a chat session
  const ensureChat = async (subject) => {
    const visitorId = getVisitorId();
    
    // Try to reuse existing chat
    const savedId = getSavedChatId();
    if (savedId) {
      // Check if still open
      const { data } = await supabase
        .from('support_chats')
        .select('id, status')
        .eq('id', savedId)
        .single();
      
      if (data && data.status === 'open') {
        setChatId(data.id);
        return data.id;
      }
    }

    // Create new chat
    const { data, error } = await supabase
      .from('support_chats')
      .insert({
        visitor_id: visitorId,
        visitor_name: 'Посетитель сайта',
        status: 'open',
        subject: subject || 'Общий вопрос',
      })
      .select('id')
      .single();

    if (error) {
      console.error('[Support] Failed to create chat:', error);
      return null;
    }

    setChatId(data.id);
    saveChatId(data.id);
    return data.id;
  };

  // Send message to Supabase
  const sendToSupabase = async (cid, text, sender = 'visitor') => {
    const { error } = await supabase
      .from('support_messages')
      .insert({ chat_id: cid, sender, text });

    if (error) {
      console.error('[Support] Failed to send message:', error);
      return false;
    }

    // Update chat's last_message and unread_count
    await supabase
      .from('support_chats')
      .update({
        last_message: text,
        updated_at: new Date().toISOString(),
        ...(sender === 'visitor' ? { unread_count: supabase.rpc ? undefined : 1 } : {}),
      })
      .eq('id', cid);

    // Increment unread count for operator
    if (sender === 'visitor') {
      await supabase.rpc('increment_unread', { chat_id_input: cid }).catch(() => {
        // RPC may not exist, fallback to direct update
        supabase.from('support_chats').update({ unread_count: 1 }).eq('id', cid);
      });
    }

    return true;
  };

  const startChat = useCallback(async (quickMsg) => {
    setView('chat');
    setIsTyping(true);

    const cid = await ensureChat(quickMsg || 'Общий вопрос');
    if (!cid) {
      setIsTyping(false);
      setMessages([{
        id: Date.now(),
        from: 'bot',
        text: 'Произошла ошибка. Пожалуйста, попробуйте позже или напишите нам в Telegram.',
        cta: true,
      }]);
      return;
    }

    if (quickMsg) {
      // Send quick message
      const userMsg = { id: 'u_' + Date.now(), from: 'user', text: quickMsg };
      setMessages([userMsg]);
      await sendToSupabase(cid, quickMsg, 'visitor');

      // Bot auto-reply
      setTimeout(async () => {
        setIsTyping(false);
        const botText = 'Спасибо за обращение! 🙏 Ваше сообщение передано оператору. Мы ответим в течение нескольких минут. Также вы можете написать нам в Telegram для мгновенного ответа.';
        const botMsg = { id: 'b_' + Date.now(), from: 'bot', text: botText, cta: true };
        setMessages(prev => [...prev, botMsg]);
        await sendToSupabase(cid, botText, 'bot');
      }, 1200);
    } else {
      // Load existing messages or show welcome
      const { data } = await supabase
        .from('support_messages')
        .select('*')
        .eq('chat_id', cid)
        .order('created_at', { ascending: true });

      if (data?.length > 0) {
        setMessages(data.map(m => ({
          id: m.id,
          from: m.sender === 'visitor' ? 'user' : 'bot',
          text: m.text,
          created_at: m.created_at,
        })));
        setIsTyping(false);
      } else {
        const welcomeText = 'Привет! 👋 Я помощник BAZZAR. Опишите ваш вопрос — оператор ответит в течение нескольких минут.';
        setMessages([{ id: 'b_' + Date.now(), from: 'bot', text: welcomeText }]);
        await sendToSupabase(cid, welcomeText, 'bot');
        setIsTyping(false);
      }
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [chatId]);

  const sendMessage = useCallback(async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;

    // Optimistic UI
    const userMsg = { id: 'u_' + Date.now(), from: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Ensure chat exists
    let cid = chatId;
    if (!cid) {
      cid = await ensureChat('Чат');
      if (!cid) return;
    }

    // Send to Supabase
    const ok = await sendToSupabase(cid, text, 'visitor');

    if (ok) {
      // Bot auto-response after a delay
      setIsTyping(true);
      setTimeout(async () => {
        setIsTyping(false);
        const lower = text.toLowerCase();

        let response;
        if (lower.includes('заказ') || lower.includes('доставк') || lower.includes('не пришл')) {
          response = 'Ваш вопрос по заказу передан оператору. Если заказ задерживается более 30 минут — напишите в Telegram для срочного решения. 🚀';
        } else if (lower.includes('возврат') || lower.includes('вернуть') || lower.includes('деньги')) {
          response = 'Запрос на возврат зафиксирован. Оператор свяжется с вами для уточнения деталей. Для ускорения — напишите в Telegram. 💰';
        } else if (lower.includes('оплат') || lower.includes('карт') || lower.includes('сбп')) {
          response = 'Вопрос по оплате передан оператору. Мы принимаем карты Visa/MC/МИР и СБП. 💳';
        } else {
          response = 'Сообщение передано оператору! Ответ придёт в этот чат. Для срочных вопросов — напишите в Telegram. 👇';
        }

        const botMsg = { id: 'b_' + Date.now(), from: 'bot', text: response, cta: true };
        setMessages(prev => [...prev, botMsg]);
        await sendToSupabase(cid, response, 'bot');
      }, 800 + Math.random() * 700);
    }
  }, [input, chatId]);

  return (
    <>
      {/* ═══ Floating Button ═══ */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={toggleOpen}
        aria-label="Поддержка"
      >
        <span className={styles.fabIcon}>
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" fill="currentColor"/>
            </svg>
          )}
        </span>
        {!isOpen && <span className={styles.fabPulse} />}
        {hasNewMessage && !isOpen && <span className={styles.fabBadge}>!</span>}
      </button>

      {/* ═══ Widget Panel ═══ */}
      {isOpen && (
        <div className={styles.widget}>
          {/* Header */}
          <div className={styles.widgetHeader}>
            <div className={styles.headerLeft}>
              {view !== 'home' && (
                <button className={styles.backBtn} onClick={() => setView(view === 'faqDetail' ? 'faq' : 'home')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
              )}
              <div>
                <h3 className={styles.headerTitle}>
                  {view === 'home' && 'Поддержка BAZZAR'}
                  {view === 'faq' && 'Частые вопросы'}
                  {view === 'faqDetail' && 'FAQ'}
                  {view === 'chat' && 'Чат с поддержкой'}
                </h3>
                <span className={styles.headerStatus}>
                  <span className={styles.statusDot} />
                  Онлайн • отвечаем за 2 мин
                </span>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={toggleOpen}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className={styles.widgetBody}>
            {/* HOME */}
            {view === 'home' && (
              <div className={styles.homeView}>
                {/* Welcome */}
                <div className={styles.welcomeCard}>
                  <div className={styles.welcomeEmoji}>👋</div>
                  <h4>Привет! Чем помочь?</h4>
                  <p>Выберите тему или начните чат</p>
                </div>

                {/* Quick Actions */}
                <div className={styles.quickSection}>
                  <span className={styles.sectionLabel}>Быстрые действия</span>
                  <div className={styles.quickGrid}>
                    {QUICK_MESSAGES.map((q, i) => (
                      <button key={i} className={styles.quickBtn} onClick={() => startChat(q.text)}>
                        <span className={styles.quickEmoji}>{q.emoji}</span>
                        <span>{q.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ preview */}
                <div className={styles.quickSection}>
                  <span className={styles.sectionLabel}>Частые вопросы</span>
                  <div className={styles.faqList}>
                    {FAQ_ITEMS.slice(0, 3).map((item, i) => (
                      <button key={i} className={styles.faqItem} onClick={() => openFaq(i)}>
                        <span>{item.q}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                      </button>
                    ))}
                    <button className={styles.faqShowAll} onClick={() => setView('faq')}>
                      Все вопросы →
                    </button>
                  </div>
                </div>

                {/* Telegram link */}
                <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.tgLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                  Написать в Telegram
                </a>

                {/* Chat button */}
                <button className={styles.chatStartBtn} onClick={() => startChat(null)}>
                  💬 Начать чат
                </button>
              </div>
            )}

            {/* FAQ LIST */}
            {view === 'faq' && (
              <div className={styles.faqView}>
                {FAQ_ITEMS.map((item, i) => (
                  <button key={i} className={styles.faqItem} onClick={() => openFaq(i)}>
                    <span>{item.q}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                ))}
              </div>
            )}

            {/* FAQ DETAIL */}
            {view === 'faqDetail' && faqIdx !== null && (
              <div className={styles.faqDetailView}>
                <h4 className={styles.faqDetailQ}>{FAQ_ITEMS[faqIdx].q}</h4>
                <p className={styles.faqDetailA}>{FAQ_ITEMS[faqIdx].a}</p>
                <div className={styles.faqDetailActions}>
                  <span className={styles.faqHelpful}>Помогло?</span>
                  <button className={styles.faqThumb}>👍 Да</button>
                  <button className={styles.faqThumb}>👎 Нет</button>
                </div>
                <button className={styles.chatStartBtn} onClick={() => startChat(null)}>
                  💬 Задать другой вопрос
                </button>
              </div>
            )}

            {/* CHAT */}
            {view === 'chat' && (
              <div className={styles.chatView}>
                <div className={styles.chatMessages} ref={chatRef}>
                  {messages.map(msg => (
                    <div key={msg.id} className={`${styles.chatMsg} ${msg.from === 'user' ? styles.chatMsgUser : styles.chatMsgBot}`}>
                      {msg.from === 'bot' && <div className={styles.botAvatar}>B</div>}
                      <div className={styles.chatBubble}>
                        <p>{msg.text}</p>
                        {msg.cta && (
                          <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.chatCta}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                            Написать оператору в Telegram →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className={`${styles.chatMsg} ${styles.chatMsgBot}`}>
                      <div className={styles.botAvatar}>B</div>
                      <div className={styles.chatBubble}>
                        <div className={styles.typing}>
                          <span /><span /><span />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form className={styles.chatInput} onSubmit={sendMessage}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Напишите сообщение..."
                    className={styles.chatField}
                  />
                  <button type="submit" className={styles.chatSend} disabled={!input.trim()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default memo(SupportWidget);

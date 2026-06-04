import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, CheckCircle, Phone, Lock, User, MapPin, TrendingUp, 
  Coins, ArrowRight, Search, PlusCircle, Settings, Layers, 
  Globe, Sun, Moon, Map, MessageSquare, PhoneCall, Video, 
  Smartphone, Activity, Check, RotateCcw, Camera, Navigation, 
  Heart, MessageCircle, X, Send, DollarSign, Building, Wallet,
  Sliders, AlertCircle, Menu, Mic, Square, Play, Pause, FileText, Plus, Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Theme, Portal, ActiveScreen, VerificationStatus, ReelListing, Comment, EscrowStatus, ChatMessage, BuyerSellerChat } from './types';
import { REEL_LISTINGS, MOCK_SAAO, TRANSLATIONS, formatCurrency, convertNumber, CATEGORIES_STRUCTURE } from './data';

interface ChatOrderFormProps {
  msg: ChatMessage;
  onSubmit: (updatedFields: any) => void;
  lang: 'en' | 'bn';
  unitPrice: number;
}

function ChatOrderForm({ msg, onSubmit, lang, unitPrice }: ChatOrderFormProps) {
  const data = msg.orderFormData;
  const [name, setName] = useState(data?.name || '');
  const [contact, setContact] = useState(data?.contact || '');
  const [address, setAddress] = useState(data?.address || '');
  const [qty, setQty] = useState(data?.quantity || '100');
  
  // Calculate dynamic pricing total
  const amountCalculated = parseFloat(qty || '0') * unitPrice;

  if (!data) return null;

  if (data.status === 'submitted') {
    return (
      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500/20 rounded-2xl space-y-2 text-xs text-neutral-700 dark:text-neutral-305">
        <div className="flex items-center justify-between border-b border-emerald-500/10 pb-1.5 mb-1 text-emerald-800 dark:text-emerald-400">
          <span className="font-bold uppercase tracking-wider text-[10px] flex items-center col-span-2">
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            {lang === 'en' ? 'Escrow Deal Financed' : 'এসক্রো চুক্তি চূড়ান্ত'}
          </span>
          <span className="bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded text-[8px]">
            LOCKED
          </span>
        </div>
        <div className="grid grid-cols-2 gap-y-1 text-[11px] font-mono">
          <div><span className="text-neutral-400">{lang === 'en' ? 'Quantity' : 'পরিমাণ'}:</span></div>
          <div className="text-right font-bold text-neutral-800 dark:text-neutral-100">{convertNumber(data.quantity, lang)} {data.unit}</div>
          
          <div><span className="text-neutral-400">{lang === 'en' ? 'Guaranteed Escrow' : 'গ্যারান্টিযুক্ত এসক্রো'}:</span></div>
          <div className="text-right text-emerald-600 dark:text-emerald-400 font-bold">{convertNumber(data.amount, lang)} BDT</div>
          
          <div><span className="text-neutral-400">{lang === 'en' ? 'Buyer Name' : 'ক্রেতার নাম'}:</span></div>
          <div className="text-right truncate font-bold">{data.name}</div>
          
          <div><span className="text-neutral-400">{lang === 'en' ? 'Contact Mobile' : 'যোগাযোগ নম্বর'}:</span></div>
          <div className="text-right">{data.contact}</div>
          
          <div className="col-span-2 border-t border-dashed border-neutral-300 dark:border-stone-850 mt-1 pt-1.5 text-[9px] text-neutral-550 dark:text-neutral-400 leading-snug">
            <span className="font-bold text-neutral-400">{lang === 'en' ? 'Delivery Address:' : 'ডেলিভারি ঠিকানা:'}</span> {data.address}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 border-2 border-dashed border-[#1A5319]/25 dark:border-emerald-500/30 rounded-2xl space-y-2.5 shadow-sm text-xs text-neutral-700 dark:text-neutral-300">
      <div className="flex items-center justify-between border-b border-neutral-400/20 dark:border-stone-850 pb-1.5 text-[#1A5319] dark:text-emerald-400">
        <span className="font-bold uppercase tracking-wider text-[10px] flex items-center">
          <FileText className="w-3.5 h-3.5 mr-1 text-purple-400 animate-pulse" />
          {lang === 'en' ? 'Deal Closing Order Form' : 'চুক্তি চূড়ান্ত করার ফর্ম'}
        </span>
        <span className="bg-red-500/15 text-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded">
          PENDING
        </span>
      </div>
      
      <div className="space-y-2 font-sans text-left">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <label className="block text-[9px] text-neutral-450 font-bold mb-0.5 uppercase">{lang === 'en' ? 'Buyer Name' : 'ক্রেতার নাম'}</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white dark:bg-[#080808] border border-neutral-300 dark:border-stone-800 rounded p-1.5 text-[11px] outline-none focus:border-[#1A5319] text-[#1D3111] dark:text-white"
              placeholder="e.g. M. Rahman"
            />
          </div>
          <div>
            <label className="block text-[9px] text-neutral-450 font-bold mb-0.5 uppercase">{lang === 'en' ? 'Contact Mobile' : 'যোগাযোগ নম্বর'}</label>
            <input 
              type="text" 
              value={contact} 
              onChange={(e) => setContact(e.target.value)}
              className="w-full bg-white dark:bg-[#080808] border border-neutral-300 dark:border-stone-800 rounded p-1.5 text-[11px] outline-none focus:border-[#1A5319] text-[#1D3111] dark:text-white"
              placeholder="0171xxxxxxx"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <label className="block text-[9px] text-neutral-450 font-bold mb-0.5 uppercase">{lang === 'en' ? 'Order Quantity' : 'অর্ডার পরিমাণ'}</label>
            <input 
              type="text" 
              value={qty} 
              onChange={(e) => setQty(e.target.value)}
              className="w-full bg-white dark:bg-[#080808] border border-neutral-300 dark:border-stone-800 rounded p-1.5 text-[11px] font-mono outline-none focus:border-[#1A5319] text-[#1D3111] dark:text-white"
              placeholder="100"
            />
          </div>
          <div>
            <label className="block text-[9px] text-neutral-450 font-bold mb-0.5 uppercase">{lang === 'en' ? 'Escrow Total' : 'মোট এসক্রো মূল্য'}</label>
            <div className="w-full bg-neutral-100 dark:bg-stone-850 text-neutral-800 dark:text-neutral-105 rounded p-1.5 text-[11px] font-mono font-bold flex items-center justify-between border border-neutral-200 dark:border-stone-800">
              <span className="text-emerald-700 dark:text-emerald-400">{convertNumber(amountCalculated, lang)} BDT</span>
              <span className="text-[8px] text-neutral-400 font-sans uppercase">({convertNumber(qty, lang)} {data.unit})</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[9px] text-neutral-450 font-bold mb-0.5 uppercase">{lang === 'en' ? 'Delivery Address' : 'ডেলিভারি ঠিকানা'}</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-white dark:bg-[#080808] border border-neutral-300 dark:border-stone-800 rounded p-1.5 text-[11px] outline-none focus:border-[#1A5319] text-[#1D3111] dark:text-white"
            placeholder="e.g. Kawran Bazar Fresh Hub, Dhaka"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            if (!name.trim() || !contact.trim() || !address.trim() || !qty.trim()) {
              alert(lang === 'en' ? 'Please fill all fields to lock the deal.' : 'অনগ্রহ করে চুক্তি চূড়ান্ত করতে সব ঘর পূরণ করুন।');
              return;
            }
            onSubmit({
              name,
              contact,
              address,
              quantity: qty,
              amount: amountCalculated + '',
              unit: data.unit,
              status: 'submitted'
            });
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs transition-with duration-300 shadow active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 text-white" />
          <span>{lang === 'en' ? 'Submit Secure Order' : 'অর্ডার ফর্ম জমা দিন'}</span>
        </button>

        <p className="text-[8.5px] text-neutral-400 text-center italic mt-1 leading-snug">
          🛡️ {lang === 'en' ? 'Deal locked securely under AgroTrust escort protection.' : '🛡️ ডিলটি এগ্রোট্রাস্ট এসক্রো সুরক্ষার আওতায় সংরক্ষিত হচ্ছে।'}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'vegetables': return <Layers className="w-4 h-4 text-emerald-500" />;
      case 'fruits': return <PlusCircle className="w-4 h-4 text-amber-500" />;
      case 'dry_fruits': return <Shield className="w-4 h-4 text-orange-500" />;
      case 'grains': return <Coins className="w-4 h-4 text-yellow-500" />;
      case 'chickens': return <Activity className="w-4 h-4 text-red-400" />;
      case 'ducks': return <Globe className="w-4 h-4 text-sky-450" />;
      case 'beef': return <MapPin className="w-4 h-4 text-rose-500" />;
      case 'cows': return <CheckCircle className="w-4 h-4 text-amber-700" />;
      case 'goats': return <Smartphone className="w-4 h-4 text-indigo-500" />;
      default: return <Layers className="w-4 h-4 text-emerald-500" />;
    }
  };

  // Global React Configurations
  const [lang, setLang] = useState<Language>('bn'); // Matches default 'bn' in PRD
  const [theme, setTheme] = useState<Theme>('light');
  const [portal, setPortal] = useState<Portal>('buyer');
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('onboarding');
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('unverified');

  // Local Time State for Status Bar
  const [currentTime, setCurrentTime] = useState('20:47');

  // Authentication Fields
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [showNidSection, setShowNidSection] = useState(false);
  const [nidNumber, setNidNumber] = useState('');
  const [dob, setDob] = useState('');
  const [verifyingDetails, setVerifyingDetails] = useState(false);
  const [registeredName, setRegisteredName] = useState('M. Rahman');

  // Profile Picture management states
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileCameraActive, setProfileCameraActive] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('farmer_green');
  const [customAiPrompt, setCustomAiPrompt] = useState('');
  const [profilePhotoError, setProfilePhotoError] = useState<string | null>(null);

  const profileVideoRef = useRef<HTMLVideoElement | null>(null);
  const profileStreamRef = useRef<MediaStream | null>(null);

  // Media capture activation for profile picture
  const startProfileCamera = async () => {
    setProfilePhotoError(null);
    try {
      setProfileCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 400, height: 400 } 
      });
      profileStreamRef.current = stream;
      if (profileVideoRef.current) {
        profileVideoRef.current.srcObject = stream;
        profileVideoRef.current.play();
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setProfilePhotoError(lang === 'en' ? 'Could not access device camera. Please check permissions.' : 'ক্যামেরা চালু করা যায়নি। অনুগ্রহ করে অনুমতি চেক করুন।');
      setProfileCameraActive(false);
    }
  };

  const stopProfileCamera = () => {
    if (profileStreamRef.current) {
      profileStreamRef.current.getTracks().forEach(track => track.stop());
      profileStreamRef.current = null;
    }
    setProfileCameraActive(false);
  };

  const captureProfilePhoto = () => {
    if (profileVideoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw the video frame to canvas
        ctx.translate(300, 0);
        ctx.scale(-1, 1); // Mirror effect
        ctx.drawImage(profileVideoRef.current, 0, 0, 300, 300);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setProfilePhoto(dataUrl);
        stopProfileCamera();
        showToast(lang === 'en' ? 'Snapshot captured and saved!' : 'ক্যামেরার ছবি সংরক্ষিত হয়েছে!');
      }
    }
  };

  const generateAiAvatar = () => {
    setAiGenerating(true);
    showToast(lang === 'en' ? 'Acquiring AI engine handshake...' : 'এআই সার্ভারের সাথে সংযোগ করা হচ্ছে...');
    setTimeout(() => {
      let finalUrl = '';
      if (customAiPrompt.trim() !== '') {
        const seedValue = encodeURIComponent(customAiPrompt.trim().toLowerCase());
        finalUrl = `https://picsum.photos/seed/${seedValue}/300/300`;
      } else {
        const presetsMap: { [key: string]: string } = {
          farmer_green: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=300&h=300',
          agrotech: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
          saao: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
          trader: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300',
          golden_grain: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=300&h=300'
        };
        finalUrl = presetsMap[selectedPreset] || presetsMap['farmer_green'];
      }
      setProfilePhoto(finalUrl);
      setAiGenerating(false);
      showToast(lang === 'en' ? 'AI profile avatar successfully synthesized!' : 'এআই প্রফাইল ছবি তৈরি হয়েছে!');
    }, 2000);
  };

  // Marketplace & Reels State
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Buyer-Seller Channel Chat states & voice messages
  const [activeChatListing, setActiveChatListing] = useState<ReelListing | null>(null);
  const [selectedChatRole, setSelectedChatRole] = useState<'buyer' | 'seller'>('buyer');
  const [chatInputText, setChatInputText] = useState('');
  
  // Voice Recording & Speech Recognition States
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSecs, setVoiceSecs] = useState(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  
  // Audio playback tracking
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const audioRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const voiceTimerRef = useRef<any>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);
  const [isSpeechTranslating, setIsSpeechTranslating] = useState(false);

  // Initial Seed Chats Map
  const [chatsRegistry, setChatsRegistry] = useState<Record<string, BuyerSellerChat>>({
    'reel_1': {
      listingId: 'reel_1',
      buyerName: 'M. Rahman',
      sellerName: 'M. S. Al-Amin',
      messages: [
        {
          id: 'm1',
          sender: 'seller',
          type: 'text',
          text: 'আসসালামু আলাইকুম। আমার এই পালং শাক আজ সকালে তোলা হয়েছে। গুণগত মান নিয়ে কোনো টেনশন নাই।',
          timestamp: '10:05 AM'
        },
        {
          id: 'm2',
          sender: 'buyer',
          type: 'text',
          text: 'ওয়া আলাইকুম আসসালাম। কারওয়ান বাজার পর্যন্ত ডেলিভারি খরচ কেমন পড়বে?',
          timestamp: '10:07 AM'
        },
        {
          id: 'm3',
          sender: 'seller',
          type: 'text',
          text: 'অগ্রিম বুকিং দিলে আমি নিজস্ব ডেলিভারি ভ্যানে পাঠিয়ে দিবো। আপনার কি পরিমাণ প্রয়োজন?',
          timestamp: '10:10 AM'
        }
      ]
    },
    'reel_2': {
      listingId: 'reel_2',
      buyerName: 'M. Rahman',
      sellerName: 'Charghat Agro Cooperative',
      messages: [
        {
          id: 'e1',
          sender: 'seller',
          type: 'text',
          text: 'Hello, welcome to our Rajshahi Fruit Stall. The Gopalbhog mangoes are 100% organic.',
          timestamp: 'Yesterday'
        },
        {
          id: 'e2',
          sender: 'buyer',
          type: 'text',
          text: 'Great, can we arrange escrow deposit for 500 KG?',
          timestamp: 'Yesterday'
        }
      ]
    }
  });

  const triggerCounterpartyResponse = (listingId: string, triggerType: 'text' | 'voice' | 'order_form') => {
    setTimeout(() => {
      setChatsRegistry(prev => {
        const currentChat = prev[listingId];
        if (!currentChat) return prev;
        
        let replyTextEn = '';
        let replyTextBn = '';
        
        if (triggerType === 'voice') {
          replyTextEn = "I received your voice message. It sounds perfect. Let me prepare the deal closing order form for you.";
          replyTextBn = "আমি আপনার ভয়েস বার্তা পেয়েছি। চমৎকার! আমি চুক্তি চূড়ান্ত করার ফর্মটি পাঠিয়ে দিচ্ছি।";
        } else if (triggerType === 'text') {
          replyTextEn = "That works for me. I am sending the official transaction closing form to secure our AgroTrust escrow. Please fill up details.";
          replyTextBn = "ঠিক আছে, আমি সম্মত। লেনদেনটি চূড়ান্ত করতে আমি এগ্রোট্রাস্ট এসক্রো ফর্ম পাঠাচ্ছি, দয়া করে পূরণ করুন।";
        } else {
          replyTextEn = "Please fill out the order form above so we can lock the biological weight and ship today.";
          replyTextBn = "অনুগ্রহ করে উপরের অর্ডার ফর্মটি পূরণ করুন যাতে আমরা ফসল দ্রুত পাঠাতে পারি।";
        }

        const newId = `reply-${Date.now()}`;
        const autoReply: ChatMessage = {
          id: newId,
          sender: selectedChatRole === 'buyer' ? 'seller' : 'buyer',
          type: 'text',
          text: lang === 'en' ? replyTextEn : replyTextBn,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // If it was text, let the auto-seller also send the order closing form 4 seconds later!
        if (selectedChatRole === 'buyer' && triggerType === 'text') {
          setTimeout(() => {
            sendOrderFormFromSeller(listingId);
          }, 3500);
        }

        return {
          ...prev,
          [listingId]: {
            ...currentChat,
            messages: [...currentChat.messages, autoReply]
          }
        };
      });
    }, 2000);
  };

  const sendOrderFormFromSeller = (listingId: string) => {
    setChatsRegistry(prev => {
      const currentChat = prev[listingId];
      if (!currentChat) return prev;
      
      const targetListing = listings.find(l => l.id === listingId) || REEL_LISTINGS[0];
      const formMsg: ChatMessage = {
        id: `form-${Date.now()}`,
        sender: 'seller',
        type: 'order_form',
        text: 'Deal Closing Order Form Request',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orderFormData: {
          name: registeredName || 'M. Rahman',
          contact: '0171' + Math.floor(1000000 + Math.random() * 9000000),
          address: 'Kawran Bazar, Dhaka',
          quantity: '100', 
          amount: parseFloat((targetListing.pricePerUnitEn || '50').replace(/[^0-9.]/g, '')) * 100 + '',
          unit: targetListing.unitEn || 'KG',
          status: 'pending'
        }
      };

      return {
        ...prev,
        [listingId]: {
          ...currentChat,
          messages: [...currentChat.messages, formMsg]
        }
      };
    });
    showToast(lang === 'en' ? 'Seller dispatched closing order form!' : 'বিক্রেতা চুক্তি চূড়ান্ত করার ফর্ম পাঠিয়েছেন!');
  };

  const startVoiceRecording = async () => {
    setVoiceError(null);
    setIsRecordingVoice(true);
    setVoiceSecs(0);
    audioChunksRef.current = [];
    
    voiceTimerRef.current = setInterval(() => {
      setVoiceSecs(prev => prev + 1);
    }, 1000);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioRecorderRef.current = recorder;
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const voiceUrl = URL.createObjectURL(audioBlob);
        
        if (activeChatListing) {
          const lId = activeChatListing.id;
          const currentChat = chatsRegistry[lId] || {
            listingId: lId,
            buyerName: 'M. Rahman',
            sellerName: activeChatListing.sellerEn,
            messages: []
          };
          
          const newMsg: ChatMessage = {
            id: `v-${Date.now()}`,
            sender: selectedChatRole,
            type: 'voice',
            text: `Voice Note (${voiceSecs}s)`,
            voiceUrl,
            voiceDuration: voiceSecs || 3,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setChatsRegistry(prev => ({
            ...prev,
            [lId]: {
              ...currentChat,
              messages: [...currentChat.messages, newMsg]
            }
          }));

          triggerCounterpartyResponse(lId, 'voice');
          showToast(lang === 'en' ? 'Voice memo submitted!' : 'ভয়েস বার্তা পাঠানো হয়েছে!');
        }
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
    } catch (err) {
      console.warn("Audio recording API blocked or not supported in iframe:", err);
    }
  };

  const stopVoiceRecording = (cancelled = false) => {
    if (voiceTimerRef.current) {
      clearInterval(voiceTimerRef.current);
      voiceTimerRef.current = null;
    }
    setIsRecordingVoice(false);

    if (audioRecorderRef.current && audioRecorderRef.current.state !== 'inactive') {
      if (cancelled) {
        audioRecorderRef.current.onstop = null;
        audioRecorderRef.current.stream.getTracks().forEach((t: any) => t.stop());
        showToast(lang === 'en' ? 'Voice recording cancelled' : 'ভয়েস রেকর্ড বাতিল করা হয়েছে');
      } else {
        audioRecorderRef.current.stop();
      }
    } else if (!cancelled) {
      // Simulate real high-definition waveform clip if mic denied by sandbox frame permissions
      if (activeChatListing) {
        const lId = activeChatListing.id;
        const currentChat = chatsRegistry[lId] || {
          listingId: lId,
          buyerName: 'M. Rahman',
          sellerName: activeChatListing.sellerEn,
          messages: []
        };
        
        const duration = voiceSecs || 5;
        const fallbackAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

        const newMsg: ChatMessage = {
          id: `v-sim-${Date.now()}`,
          sender: selectedChatRole,
          type: 'voice',
          text: `Voice Note (${duration}s)`,
          voiceUrl: fallbackAudio,
          voiceDuration: duration,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatsRegistry(prev => ({
          ...prev,
          [lId]: {
            ...currentChat,
            messages: [...currentChat.messages, newMsg]
          }
        }));

        triggerCounterpartyResponse(lId, 'text');
        showToast(lang === 'en' ? 'Voice note recorded successfully (Demo wave)!' : 'ভয়েস বার্তা রেকর্ড সম্পন্ন হয়েছে!');
      }
    }
  };

  const playVoiceNote = (msgId: string, url: string) => {
    if (playingVoiceId === msgId) {
      if (audioPlaybackRef.current) {
        audioPlaybackRef.current.pause();
      }
      setPlayingVoiceId(null);
      return;
    }

    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.pause();
    }

    setPlayingVoiceId(msgId);
    const audio = new Audio(url);
    audioPlaybackRef.current = audio;
    audio.play().catch(err => {
      console.warn("Audio play failed:", err);
      showToast(lang === 'en' ? "Simulated voice playback note active." : "সিমুলেটেড ভয়েস প্লেব্যাক সক্রিয়।");
    });

    audio.onended = () => {
      setPlayingVoiceId(null);
    };
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast(lang === 'en' ? 'Speech typing not natively supported in this iframe. Custom template applied!' : 'এই ব্রাউজারে স্পিচ-টাইপিং উপলব্ধ নয়। ডেমো টেক্সট দেয়া হচ্ছে।');
      setChatInputText(lang === 'en' ? 'How much is the shipping cost to Kawran Bazar area?' : 'কারওয়ান বাজার পর্যন্ত ডেলিভারি খরচ কেমন পড়বে?');
      return;
    }

    if (isSpeechTranslating) {
      setIsSpeechTranslating(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsSpeechTranslating(true);
        showToast(lang === 'en' ? 'Listening... Speak now!' : 'শুনছি... কথা বলুন!');
      };

      recognition.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsSpeechTranslating(false);
        setChatInputText(lang === 'en' ? 'How much is the shipping cost to Kawran Bazar area?' : 'কারওয়ান বাজার পর্যন্ত ডেলিভারি খরচ কেমন পড়বে?');
      };

      recognition.onend = () => {
        setIsSpeechTranslating(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInputText(prev => prev ? prev + ' ' + transcript : transcript);
        showToast(lang === 'en' ? `Captured: "${transcript}"` : `শোনা গেছে: "${transcript}"`);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsSpeechTranslating(false);
    }
  };

  const sendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInputText.trim() || !activeChatListing) return;

    const lId = activeChatListing.id;
    const currentChat = chatsRegistry[lId] || {
      listingId: lId,
      buyerName: 'M. Rahman',
      sellerName: activeChatListing.sellerEn,
      messages: []
    };

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: selectedChatRole,
      type: 'text',
      text: chatInputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatsRegistry(prev => ({
      ...prev,
      [lId]: {
        ...currentChat,
        messages: [...currentChat.messages, newMsg]
      }
    }));

    setChatInputText('');
    triggerCounterpartyResponse(lId, 'text');
  };

  const submitOrderFormInChat = (messageId: string, updatedFields: any) => {
    if (!activeChatListing) return;
    const lId = activeChatListing.id;

    setChatsRegistry(prev => {
      const currentChat = prev[lId];
      if (!currentChat) return prev;

      const updatedMessages = currentChat.messages.map(m => {
        if (m.id === messageId && m.orderFormData) {
          return {
            ...m,
            orderFormData: {
              ...m.orderFormData,
              ...updatedFields,
              status: 'submitted' as const
            }
          };
        }
        return m;
      });

      const summaryMsg: ChatMessage = {
        id: `summary-${Date.now()}`,
        sender: 'seller',
        type: 'order_summary',
        text: `Deal closed! Confirmed order of ${updatedFields.quantity} ${updatedFields.unit || 'KG'} for ${updatedFields.amount} BDT. Buyer Name: ${updatedFields.name}, Contact: ${updatedFields.contact}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        orderFormData: {
          ...updatedFields,
          status: 'submitted'
        }
      };

      return {
        ...prev,
        [lId]: {
          ...currentChat,
          messages: [...updatedMessages, summaryMsg]
        }
      };
    });

    setEscrowStatus('HELD');
    showToast(lang === 'en' ? 'Deal closed! Funds held in AgroTrust Escrow!' : 'চুক্তি চূড়ান্ত! এগ্রোট্রাস্ট এসক্রোতে টাকা জমা হয়েছে!');
  };

  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [listings, setListings] = useState<ReelListing[]>(REEL_LISTINGS);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({
    'reel_1': REEL_LISTINGS[0].likes,
    'reel_2': REEL_LISTINGS[1].likes,
    'reel_3': REEL_LISTINGS[2].likes,
  });
  const [userLiked, setUserLiked] = useState<{ [key: string]: boolean }>({});

  // Checkout & Pay Sheet State
  const [activeCheckoutListing, setActiveCheckoutListing] = useState<ReelListing | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'select' | 'payment_form' | 'success'>('select');
  const [selectedMFS, setSelectedMFS] = useState<'bkash' | 'nagad' | 'bank'>('bkash');
  const [mfsPhone, setMfsPhone] = useState('01711002233');
  const [mfsPin, setMfsPin] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [trxId, setTrxId] = useState('');
  const [escrowStatus, setEscrowStatus] = useState<EscrowStatus>('NONE');

  // Mapping & Parcel Delivery Animation State
  const [transitPercent, setTransitPercent] = useState(0);
  const [transitStep, setTransitStep] = useState(0);
  const transitTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Farmer Portal Forms
  const [sellerSubTab, setSellerSubTab] = useState<'dispatch' | 'analytics' | 'chats'>('analytics');
  const [analyticsFilter, setAnalyticsFilter] = useState<'day' | 'month' | 'year'>('day');
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [cropTitle, setCropTitle] = useState('');
  const [cropCategory, setCropCategory] = useState<string>('vegetables');
  const [cropUnit, setCropUnit] = useState('KG');
  const [cropPrice, setCropPrice] = useState('');
  const [cropZone, setCropZone] = useState<'Flash' | 'Buffer' | 'Vault'>('Flash');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Settings Forms
  const [bankAccount, setBankAccount] = useState({
    bankName: 'Sonali Bank PLC',
    accountNo: '2410-XXXX-XXXX-9842',
    routingNo: '200261145',
    holderName: 'M. Rahman',
    verified: true
  });
  const [mfsWallets, setMfsWallets] = useState({
    bkash: { phone: '01711-002233', verified: true, balance: 45280 },
    nagad: { phone: '01711-002233', verified: true, balance: 12450 }
  });
  const [gpsAccuracy, setGpsAccuracy] = useState('± 4.2m');
  const [gpsSatellites, setGpsSatellites] = useState(9);
  const [calibratingGps, setCalibratingGps] = useState(false);

  // SAAO Interactions State
  const [saaoSupportOpen, setSaaoSupportOpen] = useState(false);
  const [saaoMessageText, setSaaoMessageText] = useState('');
  const [saaoStatusText, setSaaoStatusText] = useState<string | null>(null);

  // Helper dictionary access
  const t = TRANSLATIONS[lang];

  // Update Clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hrs}:${mins}`);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter listings based on active category / subcategory
  const filteredListings = listings.filter(item => {
    if (activeCategory === 'all') return true;
    const parent = CATEGORIES_STRUCTURE.find(p => p.id === activeCategory);
    if (parent) {
      return item.category === parent.id || parent.subcategories.some(sub => sub.id === item.category);
    }
    return item.category === activeCategory;
  });

  // Handle phone entry OTP submission
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      showToast(lang === 'bn' ? 'সঠিক মোবাইল নম্বর প্রদান করুন' : 'Please provide a valid phone number');
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      showToast(lang === 'bn' ? '৪ ডিজিটের ওটিপি প্রেরণ করা হয়েছে' : '4-Digit Verification OTP Sent');
    }, 1000);
  };

  // Handle digit input in OTP code
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Check if OTP complete
    if (newOtp.every(digit => digit !== '')) {
      setTimeout(() => {
        setShowNidSection(true);
        showToast(lang === 'bn' ? 'ওটিপি যাচাই হয়েছে। দয়া করে জাতীয় পরিচয়পত্র প্রদান করুন।' : 'OTP Verified! Please input secure Smart NID card credentials.');
      }, 400);
    }
  };

  // Handle Porichoy National ID Verification
  const handleVerifyNid = (e: React.FormEvent) => {
    e.preventDefault();
    if (nidNumber.length !== 10 && nidNumber.length !== 17) {
      showToast(lang === 'bn' ? 'স্মার্ট এনআইডি হতে হবে ১০ বা ১৭ ডিজিটের' : 'Smart NID must be 10 or 17 digits long');
      return;
    }
    if (!dob) {
      showToast(lang === 'bn' ? 'দয়া করে জন্মতারিখ প্রদান করুন' : 'Please state valid date of birth');
      return;
    }

    setVerifyingDetails(true);
    setTimeout(() => {
      setVerifyingDetails(false);
      setVerificationStatus('verified');
      setActiveScreen('dashboard');
      showToast(lang === 'bn' ? 'জাতীয় পরিচয়পত্র নিশ্চিতকরণ সফল হয়েছে!' : 'Government Porichoy Gateway Verification Successful!');
    }, 1800);
  };

  // Toggle upvote/like
  const handleLikeReel = (reelId: string) => {
    const alreadyLiked = userLiked[reelId];
    if (alreadyLiked) {
      setLikesCount(prev => ({ ...prev, [reelId]: prev[reelId] - 1 }));
      setUserLiked(prev => ({ ...prev, [reelId]: false }));
    } else {
      setLikesCount(prev => ({ ...prev, [reelId]: prev[reelId] + 1 }));
      setUserLiked(prev => ({ ...prev, [reelId]: true }));
      showToast(lang === 'bn' ? 'এই চালানে লাইক দেওয়া হয়েছে' : 'Upvoted this consignment!');
    }
  };

  // Comments Drawer Interaction
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const currentReel = listings[currentReelIndex];
    const newComment: Comment = {
      id: 'nc_' + Date.now(),
      userEn: 'M. Rahman (You)',
      userBn: 'মোঃ রহমান (আপনি)',
      textEn: newCommentText,
      textBn: newCommentText,
      timeEn: 'Just now',
      timeBn: 'এইমাত্র'
    };

    setListings(prev => 
      prev.map(item => {
        if (item.id === currentReel.id) {
          return {
            ...item,
            comments: [newComment, ...item.comments]
          };
        }
        return item;
      })
    );

    setNewCommentText('');
    showToast(lang === 'bn' ? 'মন্তব্য যুক্ত হয়েছে!' : 'Comment posted securely!');
  };

  // Start Transit Mapping simulation
  const startTransitSimulation = () => {
    if (transitTimerRef.current) clearInterval(transitTimerRef.current);
    setTransitPercent(0);
    setTransitStep(0);

    const steps = [
      { p: 15, msg: lang === 'bn' ? 'শিপমেন্ট প্রস্তুত করছেন বিক্রেতা...' : 'Seller assembling payload container...' },
      { p: 40, msg: lang === 'bn' ? 'পণ্যবাহী ট্রাক রওয়ানা হয়েছে শিবগঞ্জ থেকে...' : 'Dhaka Metro-SH-112 en-route from Shibganj...' },
      { p: 70, msg: lang === 'bn' ? 'সিঙ্গাইর চেকপয়েন্ট অতিক্রম করছে...' : 'Crossing Singair strict DAE checkpost...' },
      { p: 95, msg: lang === 'bn' ? 'গন্তব্যের কাছাকাছি, ১.২ কি.মি. দূরত্ব বাকি!' : 'Arriving at local buffer hub facility!' },
      { p: 100, msg: lang === 'bn' ? 'মালপত্র সফলভাবে খালাস হয়েছে। এসক্রো অবমুক্ত করা যাবে!' : 'Consignment reached goal. Escrow release enabled.' }
    ];

    transitTimerRef.current = setInterval(() => {
      setTransitPercent(prev => {
        const next = prev + 5;
        if (next >= 100) {
          if (transitTimerRef.current) clearInterval(transitTimerRef.current);
          setTransitStep(4);
          setEscrowStatus('RELEASED');
          return 100;
        }
        
        // Find current message step index
        const currentThreshIndex = steps.findIndex((s, idx) => {
          const nextThresh = steps[idx + 1] ? steps[idx + 1].p : 101;
          return next >= s.p && next < nextThresh;
        });
        if (currentThreshIndex !== -1) {
          setTransitStep(currentThreshIndex);
        }

        return next;
      });
    }, 450);
  };

  // Handle MFS payment submit
  const handleConfirmEscrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfsPhone) {
      showToast(lang === 'bn' ? 'এমএফএস নম্বর দিন' : 'Enter mobile wallet number');
      return;
    }
    if (!mfsPin || mfsPin.length < 4) {
      showToast(lang === 'bn' ? '৪ বা ৫ সংখ্যার অত্যন্ত সুরক্ষিত পিন প্রদান করুন' : 'Please type correct security wallet PIN');
      return;
    }

    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setCheckoutStep('success');
      setEscrowStatus('HELD');
      const randomTrx = selectedMFS.toUpperCase().substring(0, 2) + Math.random().toString(36).substring(2, 9).toUpperCase();
      setTrxId(randomTrx);
      showToast(lang === 'bn' ? `সুরক্ষা মূল্য বুক করা হয়েছে! ট্র্যানজেকশন আইডি: ${randomTrx}` : `Escrow established successfully. TrxID: ${randomTrx}`);
      startTransitSimulation();
    }, 1500);
  };

  // Handle Farmer crop listing
  const handleNewCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropTitle) {
      showToast(lang === 'bn' ? 'ফসলের টাইটেল প্রদান করুন' : 'Provide exact crop species details');
      return;
    }
    if (!cropPrice) {
      showToast(lang === 'bn' ? 'ফসলের দর প্রদান করুন' : 'Enter asking pricing index');
      return;
    }

    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      const newId = 'reel_' + (listings.length + 1);
      const newListing: ReelListing = {
        id: newId,
        titleEn: cropTitle,
        titleBn: cropTitle,
        sellerEn: registeredName,
        sellerBn: registeredName === 'M. Rahman' ? 'এম. রহমান' : registeredName,
        sellerRating: 5.0,
        sellerJobs: 1,
        locationEn: 'Shibganj, Bogura DAE Sector',
        locationBn: 'শিবগঞ্জ, বগুড়া ডিএই ক্লাস্টার',
        distanceKm: 4,
        stockEn: '1.2 Tons Available',
        stockBn: '১.২ টন মজুদ আছে',
        pricePerUnitEn: `${cropPrice} BDT`,
        pricePerUnitBn: `${cropPrice} টাকা`,
        unitEn: cropUnit,
        unitBn: cropUnit === 'KG' ? 'কেজি' : cropUnit === 'Maund' ? 'মণ' : cropUnit === 'Ton' ? 'টন' : cropUnit === 'Piece' ? 'পিস' : 'টি',
        category: cropCategory as any,
        zoneEn: cropZone,
        zoneBn: cropZone === 'Flash' ? 'ফ্ল্যাশ' : cropZone === 'Buffer' ? 'বাফার' : 'ভল্ট',
        zoneDescEn: `Farmer-submitted fresh yield listing in ${cropZone} logistics zone. Direct certified extension node.`,
        zoneDescBn: `কৃষক কর্তৃক সরাসরি আপলোডকৃত তাজা ফসল (${cropZone} গতিশীল জোন)। ডিএই নির্ধারিত জিপিএস এলাকা।`,
        bgGradient: cropZone === 'Flash' ? 'from-emerald-950/80 to-slate-900/40' : cropZone === 'Buffer' ? 'from-green-950/80 to-stone-900/40' : 'from-yellow-950/80 to-neutral-900/40',
        imageUrl: capturedImage || 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600&auto=format&fit=crop',
        likes: 12,
        comments: []
      };

      setListings([newListing, ...listings]);
      setLikesCount(prev => ({ ...prev, [newId]: 12 }));
      
      // Reset form fields
      setCropTitle('');
      setCropCategory('vegetables');
      setCropPrice('');
      setCapturedImage(null);
      setPortal('buyer'); // Switch back to buyer feed to see the newly uploaded reel!
      setCurrentReelIndex(0); // Show the new crop on top

      showToast(lang === 'bn' ? 'অভিনন্দন! আপনার ডিসপ্যাচ লাইভ করা হয়েছে!' : 'Congratulations! Your fresh dispatch is streaming live!');
    }, 1200);
  };

  // Mock Camera Click Simulation
  const triggerCameraMock = () => {
    setCameraActive(true);
    setTimeout(() => {
      setCameraActive(false);
      // Let's alternate between beautiful local imagery to pretend we scanned a real field crop
      const imagesList = [
        'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=400&auto=format&fit=crop', // Paddy grains
        'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=400&auto=format&fit=crop', // Cabbage
        'https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?q=80&w=400&auto=format&fit=crop'  // Field harvest
      ];
      const randomImg = imagesList[Math.floor(Math.random() * imagesList.length)];
      setCapturedImage(randomImg);
      showToast(lang === 'bn' ? 'ফসলের ডিজিটাল টোকেন সফলভাবে যুক্ত হয়েছে!' : 'Smart Yield Digital Token captured successfully!');
    }, 1500);
  };

  // Recalibrate GPS
  const triggerGpsCalibration = () => {
    setCalibratingGps(true);
    setTimeout(() => {
      setCalibratingGps(false);
      setGpsAccuracy('± 1.2 meters');
      setGpsSatellites(15);
      showToast(t.calibrationSuccess);
    }, 2000);
  };

  // Trigger Local Notification Toast Helper
  const showToast = (message: string) => {
    setFeedbackToast(message);
  };

  useEffect(() => {
    if (feedbackToast) {
      const timer = setTimeout(() => {
        setFeedbackToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [feedbackToast]);

  // Clean-up transit timer
  useEffect(() => {
    return () => {
      if (transitTimerRef.current) clearInterval(transitTimerRef.current);
    };
  }, []);

  // Quick Action SAAO Trigger
  const handleSaaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saaoMessageText.trim()) return;

    setSaaoStatusText(lang === 'bn' ? 'ডিএই সার্ভারে প্রমাণ ম্যাট্রিক্স পাঠানো হচ্ছে...' : 'Transmitting encrypted Proof Matrix to DAE server...');
    setTimeout(() => {
      setSaaoStatusText(null);
      showToast(lang === 'bn' ? 'উপ-সহকারী কৃষি কর্মকর্তার কাছে সফলভাবে বার্তা পাঠানো হয়েছে' : 'GPS Telemetry data log sent to SAAO!');
      setSaaoMessageText('');
      setSaaoSupportOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-900 flex lg:py-6 lg:px-4 items-center justify-center font-sans overflow-x-hidden select-none selection:bg-emerald-800 selection:text-white">
      
      {/* 1. BACKGROUND DECORATION (Sleek Blur Canvas representing modern design craftsmanship) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-950/20 blur-[130px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-teal-900/10 blur-[150px]" />
        <div className="absolute top-10 right-10 flex flex-col items-end text-neutral-400 font-mono text-xs space-y-1">
          <div>AGROTRUST CORE HUB // LIVE PLATFORM : BD_EAST</div>
          <div>UTC PROTOCOL ACTIVE : {new Date().toISOString().split('T')[0]}</div>
          <div>NID VERIFICATION: GOVERNMENT PORICHOY GATEWAY INTEGRATION</div>
        </div>
      </div>

      {/* 1.5 DESKTOP & MOBILE WRAPPER GRID */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 z-10 w-full max-w-5xl px-4 relative">
        
        {/* DESKTOP SIDEBAR PANEL */}
        {activeScreen === 'dashboard' && portal === 'buyer' && (
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`hidden lg:flex flex-col w-[290px] h-[840px] rounded-[32px] border backdrop-blur-md p-6 shadow-2xl overflow-y-auto scrollbar-none transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-[#121212]/95 border-white/15 text-white' 
                : 'bg-white/95 border-emerald-500/25 text-slate-800'
            }`}
          >
            {/* Sidebar Brand Header */}
            <div className="border-b pb-4 mb-4 border-neutral-200 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-[#4E9F3D] flex items-center justify-center shadow-lg">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-xs font-bold tracking-tight uppercase dark:text-[#4E9F3D] text-emerald-800">AgroEscrow Terminal</h2>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-[#1A5319] dark:text-[#4E9F3D]">SECURE PORTAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Navigator */}
            <div className="flex-1 space-y-4">
              {/* All Products Pillar */}
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setCurrentReelIndex(0);
                }}
                className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-emerald-750 text-white shadow-md'
                    : 'hover:bg-emerald-500/10 dark:hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>{lang === 'en' ? 'All Products' : 'সব পণ্য সমগ্র'}</span>
                </div>
                <span className="text-[10px] bg-emerald-950/40 text-emerald-300 px-2 py-0.5 rounded-full font-mono">{listings.length}</span>
              </button>

              {/* Categories Group list */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase select-none font-mono">
                  {lang === 'en' ? 'Agro Categories' : 'ফসলের শ্রেণীবিভাজন'}
                </h3>

                <div className="space-y-1">
                  {CATEGORIES_STRUCTURE.map((parent) => {
                    const isParentActive = activeCategory === parent.id;
                    const parentCount = listings.filter(item => {
                      return item.category === parent.id || parent.subcategories.some(sub => sub.id === item.category);
                    }).length;

                    return (
                      <div key={parent.id} className="space-y-1 border-b border-neutral-100 dark:border-neutral-900/50 pb-2.5 pt-1">
                        {/* Parent Category Header Selector */}
                        <button
                          onClick={() => {
                            setActiveCategory(parent.id);
                            setCurrentReelIndex(0);
                          }}
                          className={`w-full py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isParentActive
                              ? 'bg-emerald-600/20 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20 shadow-sm'
                              : 'hover:bg-emerald-500/5 dark:hover:bg-white/5 text-slate-700 dark:text-neutral-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon(parent.id)}
                            <span>{lang === 'en' ? parent.nameEn : parent.nameBn}</span>
                          </div>
                          <span className="text-[9px] font-mono opacity-80 bg-neutral-100 dark:bg-stone-900 px-1.5 py-0.5 rounded-full">
                            {parentCount}
                          </span>
                        </button>

                        {/* Subcategories Container */}
                        <div className="pl-6 pt-1 space-y-1">
                          {parent.subcategories.map((sub) => {
                            const isSubActive = activeCategory === sub.id;
                            const subCount = listings.filter(item => item.category === sub.id).length;

                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setActiveCategory(sub.id);
                                  setCurrentReelIndex(0);
                                }}
                                className={`w-full py-1 px-2 rounded-md text-[11px] font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                                  isSubActive
                                    ? 'text-emerald-700 dark:text-[#4E9F3D] font-bold bg-emerald-50/50 dark:bg-[#1A5319]/10'
                                    : 'text-neutral-500 hover:text-neutral-950 dark:hover:text-white_80'
                                }`}
                              >
                                <span className="flex items-center">
                                  <span className={`w-1 h-1 rounded-full mr-2 ${isSubActive ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                                  {lang === 'en' ? sub.nameEn : sub.nameBn}
                                </span>
                                <span className="text-[8px] font-mono opacity-60">
                                  {subCount}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom telemetry status widget */}
            <div className="mt-6 border-t pt-4 border-neutral-200 dark:border-white/10 text-[9px] text-neutral-400 font-mono space-y-1">
              <div>GPS POSITION LOCK: ACCURATE</div>
              <div>STABLE LAT/LON ROUTING CONNECT</div>
              <div>DAE SMART-ESCROW ENVELOPE: ACTIVE</div>
            </div>
          </motion.div>
        )}

        {/* 2. MAIN MOBILE DEVICE ENCLOSURE (With fluid stretch to full-screen on mobile screens) */}
        <div id="agrotrust-frame" className={`w-full max-w-full min-h-screen lg:min-h-0 lg:w-[410px] lg:h-[840px] lg:rounded-[42px] lg:border-8 lg:border-stone-800 lg:shadow-2xl relative flex flex-col overflow-hidden transition-all duration-300 ${
          theme === 'dark' ? 'bg-[#0A0A0A] text-[#E0E0E0]' : 'bg-[#F4F6F4] text-[#212121]'
        }`}>
        
        {/* Notch / Dynamic Status Bar */}
        <div className="absolute top-0 inset-x-0 h-10 px-6 flex items-center justify-between z-50 pointer-events-none bg-gradient-to-b from-black/50 to-transparent">
          <span className="text-white text-xs font-semibold select-none font-mono tracking-tight">{currentTime}</span>
          <div className="flex items-center space-y-1 text-white space-x-1.5 text-xs">
            <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">{lang}</span>
            <span className="opacity-80">📶</span>
            <span className="opacity-80">🔋</span>
          </div>
        </div>

        {/* Dynamic Float Toast notification */}
        <AnimatePresence>
          {feedbackToast && (
            <motion.div 
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-12 inset-x-4 z-50"
            >
              <div className="bg-stone-900 border border-emerald-500/30 text-white rounded-xl py-3 px-4 shadow-xl flex items-center space-x-3 backdrop-blur-md">
                <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-xs font-semibold tracking-wide flex-1">{feedbackToast}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Floating Header (Shown once unlocked) */}
        {activeScreen !== 'onboarding' && (
          <div className={`pt-10 pb-2 px-4 flex items-center justify-between transition-all duration-300 z-40 border-b backdrop-blur-md ${
            theme === 'dark' ? 'bg-black/15 border-white/10' : 'bg-white/20 border-emerald-100'
          }`}>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-1 -ml-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 lg:hidden text-neutral-600 dark:text-neutral-300"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-lg bg-[#1A5319] flex items-center justify-center shadow-md">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold font-display tracking-tight text-[#1A5319] dark:text-[#4E9F3D]">
                  {t.appTitle}
                </h1>
                <p className="text-[9px] font-semibold text-neutral-400 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
                  {verificationStatus === 'verified' ? 'NID Verified: ' + registeredName : 'Offline Mode'}
                </p>
              </div>
            </div>

            {/* Language & Theme Controls Quick Header Triggers */}
            <div className="flex items-center space-x-1">
              <button 
                id="btn-quick-lang"
                onClick={() => setLang(prev => prev === 'en' ? 'bn' : 'en')}
                className={`p-1.5 rounded-lg text-xs font-bold font-mono border transition-all ${
                  theme === 'dark' ? 'border-stone-800 hover:bg-stone-900' : 'border-neutral-200 hover:bg-neutral-100'
                }`}
                title="Swith Language"
              >
                {lang === 'en' ? 'বাংলা' : 'EN'}
              </button>
              <button 
                id="btn-quick-theme"
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                className={`p-1.5 rounded-lg border transition-all ${
                  theme === 'dark' ? 'border-stone-800 text-amber-400 hover:bg-stone-900' : 'border-neutral-200 text-[#1A5319] hover:bg-neutral-100'
                }`}
                title="Switch Theme"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              {profilePhoto && (
                <div 
                  onClick={() => setActiveScreen('settings')}
                  className="w-7 h-7 rounded-full border-2 border-emerald-500 overflow-hidden cursor-pointer active:scale-95 transition-all flex-shrink-0"
                  title="View Settings Profile"
                >
                  <img src={profilePhoto} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* WORKSPACE AREA SCENE CONTAINER */}
        <div id="agrotrust-viewport" className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
          
          <AnimatePresence mode="wait">
            
            {/* SCREEN STATE 1: NID ONBOARDING & AUTHENTICATION FLOW */}
            {activeScreen === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`flex-1 flex flex-col p-6 pt-16 transition-colors duration-300 relative ${
                  theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#F4F6F4]'
                }`}
              >
                {/* iOS Glass Floating Translate & Theme Toggle */}
                <div className="absolute top-3 right-6 flex items-center space-x-2 z-40">
                  <button 
                    id="btn-onboarding-lang"
                    onClick={() => setLang(prev => prev === 'en' ? 'bn' : 'en')}
                    className="px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all duration-300 bg-white/45 dark:bg-stone-900/40 backdrop-blur-md border border-neutral-300/30 dark:border-white/10 text-[#1A5319] dark:text-[#4E9F3D] hover:bg-white/60 dark:hover:bg-stone-900/60 shadow-sm flex items-center space-x-1 active:scale-95 cursor-pointer"
                    title="Change Language / ভাষা পরিবর্তন করুন"
                  >
                    <Globe className="w-3 h-3 text-[#1A5319] dark:text-[#4E9F3D]" />
                    <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
                  </button>
                  <button 
                    id="btn-onboarding-theme"
                    onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                    className="p-1.5 rounded-full transition-all duration-300 bg-white/45 dark:bg-stone-900/40 backdrop-blur-md border border-neutral-300/30 dark:border-white/10 text-[#1A5319] dark:text-[#4E9F3D] hover:bg-white/60 dark:hover:bg-stone-900/90 shadow-sm flex items-center justify-center active:scale-95 cursor-pointer"
                    title="Toggle Theme"
                  >
                    {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                  </button>
                </div>

                {/* Visual Identity Logo & Introduction Header */}
                <div className="text-center my-auto flex flex-col items-center">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-800/10 border-2 border-emerald-500/20 flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                  </div>
                  <h1 className="text-2xl font-bold font-display tracking-tight text-[#1A5319] dark:text-[#4E9F3D]">
                    {t.appTitle}
                  </h1>
                  <p className="text-xs font-semibold text-neutral-400 tracking-wide mt-1">
                    {t.tagline}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-2 max-w-[260px]">
                    {t.onboardingSub}
                  </p>
                </div>

                <div className="my-auto space-y-5 w-full bg-white dark:bg-[#121212] p-5 rounded-2xl border border-emerald-500/10 shadow-sm">
                  
                  {/* Phone Form Container */}
                  {!otpSent ? (
                    <form id="form-auth-phone" onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5 uppercase tracking-wider">
                          {t.phoneLabel}
                        </label>
                        <div className="flex rounded-lg overflow-hidden border border-emerald-500/20 focus-within:ring-2 focus-within:ring-emerald-500/45 search-box">
                          <span className="bg-emerald-100 dark:bg-emerald-950/50 text-[#1A5319] dark:text-[#4E9F3D] px-3 py-2.5 font-bold font-sans text-sm flex items-center">
                            +880
                          </span>
                          <input 
                            id="input-phone-mask"
                            type="tel" 
                            disabled={otpLoading}
                            placeholder={t.phonePlaceholder}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full px-3 py-2.5 text-sm bg-transparent border-0 outline-none font-bold"
                          />
                        </div>
                      </div>

                      <button
                        id="btn-send-otp"
                        type="submit"
                        disabled={otpLoading}
                        className="w-full bg-[#1A5319] hover:bg-emerald-800 dark:bg-[#4E9F3D] dark:hover:bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-sm transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        {otpLoading ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            <span className="text-xs">{t.sendingOtp}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-xs">{t.sendOtp}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* OTP Display & Verification Section */
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide text-center">
                          {t.otpLabel}
                        </label>
                        <div className="flex justify-center space-x-3">
                          {otpCode.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              maxLength={1}
                              pattern="[0-9]*"
                              inputMode="numeric"
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              className="w-12 h-12 text-center text-lg font-bold border border-emerald-500/20 bg-emerald-50/50 dark:bg-stone-900/50 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button 
                          id="btn-resend-otp"
                          onClick={() => {
                            setOtpCode(['', '', '', '']);
                            setOtpSent(false);
                          }}
                          className="text-[11px] text-[#1A5319] dark:text-[#4E9F3D] font-bold underline flex items-center space-x-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>{lang === 'bn' ? 'নম্বর পরিবর্তন করুন' : 'Change Phone Number'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* NID AND VERIFICATION CANVAS */}
                  <AnimatePresence>
                    {showNidSection && (
                      <motion.form 
                        id="form-auth-nid"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleVerifyNid}
                        className="space-y-4 border-t border-emerald-500/10 pt-4"
                      >
                        <div>
                          <label className="block text-xs font-bold text-[#1A5319] dark:text-[#4E9F3D] mb-1 uppercase tracking-wide flex items-center">
                            <Shield className="w-3.5 h-3.5 mr-1" />
                            {t.nidLabel}
                          </label>
                          <input 
                            id="input-nid-number"
                            type="text" 
                            required
                            disabled={verifyingDetails}
                            placeholder={t.nidPlaceholder}
                            value={nidNumber}
                            onChange={(e) => setNidNumber(e.target.value.replace(/\D/g, '').slice(0, 17))}
                            className="w-full px-3 py-2.5 text-sm rounded-lg border border-emerald-500/20 focus:ring-2 focus:ring-emerald-500/30 outline-none bg-stone-50 dark:bg-[#0A0A0A] font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">
                            {t.dobLabel}
                          </label>
                          <input 
                            id="input-nid-dob"
                            type="text" 
                            required
                            disabled={verifyingDetails}
                            placeholder={t.dobPlaceholder}
                            value={dob}
                            onChange={(e) => {
                              // Rough masking for DD-MM-YYYY
                              let val = e.target.value.replace(/[^0-9-]/g, '');
                              if (val.length === 2 && !val.includes('-')) val += '-';
                              if (val.length === 5 && val.split('-').length === 2) val += '-';
                              setDob(val.slice(0, 10));
                            }}
                            className="w-full px-3 py-2.5 text-sm rounded-lg border border-emerald-500/20 focus:ring-2 focus:ring-emerald-500/30 outline-none bg-stone-50 dark:bg-[#0A0A0A] font-mono"
                          />
                        </div>

                        <button
                          id="btn-nid-submit"
                          type="submit"
                          disabled={verifyingDetails}
                          className="w-full mt-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold py-3 rounded-lg text-xs tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                        >
                          {verifyingDetails ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              <span className="font-semibold text-xs">{t.verifying}</span>
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 text-emerald-300" />
                              <span>{t.verifyProfile}</span>
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* iOS glass like direct seller login trigger */}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200/40 dark:border-white/10" />
                    </div>
                    <span className="relative px-3 text-[10px] uppercase font-bold tracking-widest text-[#1A5319]/70 dark:text-[#4E9F3D]/70 bg-white dark:bg-[#121212] transition-colors duration-300">
                      {lang === 'en' ? 'Or Direct Access' : 'অথবা সরাসরি প্রবেশ করুন'}
                    </span>
                  </div>

                  <button
                    id="btn-login-seller"
                    type="button"
                    onClick={() => {
                      setVerificationStatus('verified');
                      setActiveScreen('dashboard');
                      setPortal('seller');
                      showToast(lang === 'bn' ? 'বিক্রেতা হিসেবে সফলভাবে লগইন করা হয়েছে!' : 'Logged in successfully as verified Farmer/Seller!');
                    }}
                    className="w-full bg-white/45 dark:bg-stone-900/40 backdrop-blur-md border border-neutral-300/30 dark:border-white/10 text-[#1A5319] dark:text-[#4E9F3D] hover:bg-white/60 dark:hover:bg-stone-900/60 font-bold py-2.5 rounded-xl text-xs tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm active:scale-98"
                  >
                    <User className="w-4 h-4 text-[#1A5319] dark:text-[#4E9F3D]" />
                    <span>{lang === 'en' ? 'Log in as Farmer / Seller' : 'কৃষক / বিক্রেতা হিসেবে লগইন করুন'}</span>
                  </button>
                </div>

                {/* Secure footer tagline */}
                <div className="mt-auto pt-6 text-center">
                  <div className="flex items-center justify-center space-x-1.5 text-neutral-400 select-none">
                    <span className="text-[10px]">🔒 GOVERNMENT LEVEL AES-SECURE PORTAL</span>
                  </div>
                </div>
              </motion.div>
            )}


            {/* SCREEN STATE 2: THE BUYER PORTAL (IMMERSIVE AGRO-REELS MARKETPLACE) */}
            {activeScreen === 'dashboard' && portal === 'buyer' && (
              <motion.div
                key="buyer-dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col relative"
              >
                
                {/* PERSISTENT HORIZONTALLY SCROLLABLE CATEGORY PILLS */}
                <div className={`py-2 px-3 border-b flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-none transition-all duration-300 backdrop-blur-md ${
                  theme === 'dark' ? 'bg-black/15 border-white/10' : 'bg-white/25 border-[#1A5319]/10'
                }`}>
                  {/* Dynamic Active Subcategory Pill */}
                  {(() => {
                    const mainCategories = ['all', 'vegetables', 'fruits', 'dry_fruits', 'grains', 'chickens', 'ducks', 'beef', 'cows', 'goats'];
                    if (!mainCategories.includes(activeCategory)) {
                      let subNameEn = activeCategory;
                      let subNameBn = activeCategory;
                      CATEGORIES_STRUCTURE.forEach(parent => {
                        const found = parent.subcategories.find(sub => sub.id === activeCategory);
                        if (found) {
                          subNameEn = found.nameEn;
                          subNameBn = found.nameBn;
                        }
                      });
                      
                      return (
                        <button
                          id={`cat-pill-dynamic-active`}
                          onClick={() => {
                            setActiveCategory('all');
                            setCurrentReelIndex(0);
                          }}
                          className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer bg-emerald-600/35 dark:bg-emerald-400/30 backdrop-blur-md border border-emerald-500/50 text-[#1A5319] dark:text-[#4E9F3D] shadow-[0_4px_12px_rgba(16,185,129,0.15)] flex items-center space-x-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>{lang === 'en' ? subNameEn : subNameBn}</span>
                          <span className="text-[10px] opacity-75 ml-1">×</span>
                        </button>
                      );
                    }
                    return null;
                  })()}

                  {[
                    { id: 'all', label: t.cat_all },
                    { id: 'vegetables', label: t.cat_vegetables },
                    { id: 'fruits', label: t.cat_fruits },
                    { id: 'dry_fruits', label: t.cat_dry_fruits },
                    { id: 'grains', label: t.cat_grains },
                    { id: 'chickens', label: t.cat_chickens },
                    { id: 'ducks', label: t.cat_ducks },
                    { id: 'beef', label: t.cat_beef },
                    { id: 'cows', label: t.cat_cows },
                    { id: 'goats', label: t.cat_goats },
                  ].map((categoryItem) => (
                    <button 
                      key={categoryItem.id}
                      id={`cat-pill-${categoryItem.id}`}
                      onClick={() => {
                        setActiveCategory(categoryItem.id);
                        setCurrentReelIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                        activeCategory === categoryItem.id 
                          ? 'bg-emerald-600/25 dark:bg-emerald-400/20 backdrop-blur-md border border-emerald-500/35 text-[#1A5319] dark:text-[#4E9F3D] shadow-[0_4px_12px_rgba(16,185,129,0.1)]' 
                          : 'bg-white/40 dark:bg-stone-900/40 backdrop-blur-sm border border-neutral-300/30 dark:border-white/10 text-neutral-500 dark:text-neutral-400 hover:bg-white/60 dark:hover:bg-stone-900/60'
                      }`}
                    >
                      {categoryItem.label}
                    </button>
                  ))}
                </div>

                {/* SECTOR VERTICAL REEL SLIDES COMPONENT (TikTok / Instagram Reels Clone) */}
                <div id="agro-reels-container" className="flex-1 bg-black relative flex items-center justify-center overflow-hidden h-[450px]">
                  
                  {filteredListings.length > 0 ? (
                    (() => {
                      const activeItem = filteredListings[currentReelIndex % filteredListings.length];
                      return (
                        <div className="absolute inset-0 w-full h-full flex flex-col justify-end transition-all duration-500">
                          
                          {/* Image Background representing the reel item content */}
                          <img 
                            src={activeItem.imageUrl} 
                            referrerPolicy="no-referrer"
                            alt={activeItem.titleEn} 
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                          />

                          {/* Dark Glassmorphism bottom overlay backing */}
                          <div className={`absolute inset-0 bg-gradient-to-t ${activeItem.bgGradient} mix-blend-multiply`} />

                          {/* Dynamic Header Badge for Logistics Velocity Zone */}
                          <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/30 flex items-center space-x-1 z-30">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            <span className="text-[10px] text-yellow-300 font-bold tracking-widest uppercase font-mono">
                              Velocity Zone: {lang === 'en' ? activeItem.zoneEn : activeItem.zoneBn}
                            </span>
                          </div>

                          {/* RIGHT-HAND FLOATING ACTION TRAY */}
                          <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-4 z-30">
                            
                            {/* Like Node */}
                            <motion.button
                              id="btn-reel-like"
                              whileTap={{ scale: 0.8 }}
                              onClick={() => handleLikeReel(activeItem.id)}
                              className={`w-12 h-12 rounded-full flex flex-col items-center justify-center backdrop-blur-md transition-all shadow-lg ${
                                userLiked[activeItem.id]
                                  ? 'bg-rose-500/95 text-white'
                                  : 'bg-black/60 border border-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              <Heart className={`w-5.5 h-5.5 ${userLiked[activeItem.id] ? 'fill-current' : ''}`} />
                            </motion.button>
                            <span className="text-[10px] font-bold text-white tracking-wider font-mono bg-black/40 px-1.5 py-0.5 rounded-full select-none">
                              {convertNumber(likesCount[activeItem.id] || activeItem.likes, lang)}
                            </span>

                            {/* Comments Button Node */}
                            <button
                              id="btn-reel-comments"
                              onClick={() => setShowCommentsDrawer(true)}
                              className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex flex-col items-center justify-center backdrop-blur-md text-white hover:bg-white/20 transition-all shadow-lg"
                            >
                              <MessageCircle className="w-5.5 h-5.5 text-emerald-400" />
                            </button>
                            <span className="text-[10px] font-bold text-white tracking-wider font-mono bg-black/40 px-1.5 py-0.5 rounded-full select-none">
                              {convertNumber(activeItem.comments.length, lang)}
                            </span>

                            {/* DAE Info Shortcut */}
                            <button
                              id="btn-dae-quick"
                              onClick={() => setSaaoSupportOpen(true)}
                              className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 flex items-center justify-center backdrop-blur-md text-white transition-all shadow-lg animate-bounce"
                              title="Ask DAE Expert"
                            >
                              <span className="text-xs font-mono font-bold">DAE</span>
                            </button>
                          </div>

                          {/* LEFT-HAND METADATA METRICS TEXT OVERLAY */}
                          <div className="absolute left-3 bottom-6 right-16 space-y-2 z-20 pointer-events-none">
                            
                            {/* Seller profile identification with verified badge shield */}
                            <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm p-1 rounded-lg w-max max-w-full">
                              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white font-mono text-[10px]">
                                {activeItem.sellerEn[0]}
                              </div>
                              <div className="truncate pr-1">
                                <p className="text-[10px] font-bold text-white flex items-center">
                                  <span>{lang === 'en' ? activeItem.sellerEn : activeItem.sellerBn}</span>
                                  <Shield className="w-3 h-3 text-emerald-400 ml-1 flex-shrink-0" />
                                </p>
                                <p className="text-[8px] text-emerald-300 font-semibold">
                                  {t.trustScore}: {convertNumber(activeItem.sellerRating, lang)}★ ({convertNumber(activeItem.sellerJobs, lang)} escrows)
                                </p>
                              </div>
                            </div>

                            {/* Title & Location details */}
                            <div className="space-y-0.5">
                              <h2 className="text-base font-bold text-white leading-tight font-display drop-shadow">
                                {lang === 'en' ? activeItem.titleEn : activeItem.titleBn}
                              </h2>
                              <p className="text-[11px] font-semibold text-neutral-300 flex items-center">
                                <MapPin className="w-3 h-3 mr-1 text-emerald-400" />
                                <span>{lang === 'en' ? activeItem.locationEn : activeItem.locationBn} ({lang === 'en' ? `📍 ${activeItem.distanceKm} km away` : `📍 ${convertNumber(activeItem.distanceKm, lang)} কি.মি. দূরে`})</span>
                              </p>
                            </div>

                            {/* Logistics info block & Stock display */}
                            <div className="flex flex-col space-y-1 bg-black/55 backdrop-blur-md p-2 rounded-xl border border-white/5 max-w-[280px]">
                              <p className="text-[10px] font-bold text-yellow-300 leading-snug">
                                {lang === 'en' ? activeItem.zoneDescEn : activeItem.zoneDescBn}
                              </p>
                              
                              <div className="flex items-center justify-between text-[11px] text-white pt-1 border-t border-white/10">
                                <span className="font-semibold text-emerald-300">
                                  {t.stockPrefix} {lang === 'en' ? activeItem.stockEn : activeItem.stockBn}
                                </span>
                                <span className="font-mono font-bold text-amber-300">
                                  {lang === 'en' ? `${activeItem.pricePerUnitEn}/${activeItem.unitEn}` : `${activeItem.pricePerUnitBn}/${activeItem.unitBn}`}
                                </span>
                              </div>
                            </div>

                            {/* Dual action purchasing and transparent chatting buttons */}
                            <div className="pointer-events-auto flex gap-2 w-full">
                              <button
                                id="btn-instant-buy"
                                onClick={() => {
                                  setActiveCheckoutListing(activeItem);
                                  setCheckoutStep('select');
                                  setEscrowStatus('NONE');
                                }}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs tracking-wide transition-all shadow-md flex items-center justify-center space-x-1.5"
                              >
                                <Coins className="w-4 h-4 text-emerald-200" />
                                <span className="truncate">{t.instantBuy}</span>
                              </button>

                              <button
                                id="btn-negotiate-chat"
                                onClick={() => {
                                  setActiveChatListing(activeItem);
                                  setSelectedChatRole('buyer');
                                  showToast(lang === 'en' ? `Opening transparent negotiation with ${activeItem.sellerEn}` : `${activeItem.sellerBn}-এর সাথে চ্যাট চালু হচ্ছে...`);
                                }}
                                className="flex-1 bg-stone-950/80 hover:bg-stone-900 border border-white/10 text-white font-bold py-2.5 px-3 rounded-xl text-xs tracking-wide transition-all shadow-md flex items-center justify-center space-x-1.5 whitespace-nowrap"
                              >
                                <MessageSquare className="w-4 h-4 text-emerald-450" />
                                <span className="truncate">{lang === 'en' ? 'Chat & Deal' : 'চ্যাট ও ডিল'}</span>
                              </button>
                            </div>

                          </div>

                          {/* Swipe Navigation buttons overlay */}
                          <div className="absolute top-1/2 right-3 -translate-y-1/2 flex flex-col space-y-1.5 z-30">
                            <button 
                              id="btn-reel-prev"
                              onClick={() => {
                                setCurrentReelIndex(prev => prev > 0 ? prev - 1 : filteredListings.length - 1);
                                showToast(lang === 'bn' ? 'আগের চালান' : 'Previous Agro-Consignment');
                              }}
                              className="w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 active:scale-95"
                              title="Previous Reel"
                            >
                              ▲
                            </button>
                            <button 
                              id="btn-reel-next"
                              onClick={() => {
                                setCurrentReelIndex(prev => (prev + 1) % filteredListings.length);
                                showToast(lang === 'bn' ? 'পরবর্তী চালান' : 'Next Agro-Consignment');
                              }}
                              className="w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 active:scale-95 animate-pulse"
                              title="Next Reel"
                            >
                              ▼
                            </button>
                          </div>

                        </div>
                      );
                    })()
                  ) : (
                    <div className="p-8 text-center text-stone-400 font-semibold flex flex-col items-center">
                      <AlertCircle className="w-12 h-12 text-stone-500 mb-2" />
                      <p>{lang === 'bn' ? 'এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি' : 'No available yield list for this selected Category'}</p>
                    </div>
                  )}

                </div>

                {/* REAL-TIME COMMITTED COMMENTS SIDE DRAWER */}
                <AnimatePresence>
                  {showCommentsDrawer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col justify-end"
                    >
                      {/* Minimize Click Overlay Area */}
                      <div className="flex-1" onClick={() => setShowCommentsDrawer(false)} />

                      <motion.div 
                        initial={{ y: 250 }}
                        animate={{ y: 0 }}
                        exit={{ y: 250 }}
                        className={`max-h-[360px] rounded-t-3xl p-4 flex flex-col space-y-3 ${
                          theme === 'dark' ? 'bg-[#121212] border-t border-stone-800' : 'bg-white border-t border-emerald-100'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-stone-800">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A5319] dark:text-[#4E9F3D]">
                            {t.commentsTitle}
                          </h3>
                          <button 
                            id="btn-comments-close"
                            onClick={() => setShowCommentsDrawer(false)}
                            className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-stone-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Scrolling list */}
                        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs max-h-[180px] p-1">
                          {filteredListings.length > 0 && filteredListings[currentReelIndex % filteredListings.length]?.comments.length === 0 ? (
                            <p className="text-center text-neutral-400 py-4 italic">
                              {lang === 'bn' ? 'আলোচনা শুরু করতে মন্তব্য করুন...' : 'No comments yet. Start the escrow negotiation!'}
                            </p>
                          ) : (
                            filteredListings[currentReelIndex % filteredListings.length]?.comments.map(c => (
                              <div key={c.id} className="p-2 rounded-lg bg-neutral-100 dark:bg-stone-900 border border-neutral-200/50 dark:border-stone-850">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-[#1A5319] dark:text-[#4E9F3D] text-[10px] truncate max-w-[150px]">
                                    {lang === 'en' ? c.userEn : c.userBn}
                                  </span>
                                  <span className="text-[9px] text-[#212121]/50 dark:text-[#E0E0E0]/55">
                                    {lang === 'en' ? c.timeEn : c.timeBn}
                                  </span>
                                </div>
                                <p className="text-[11px] leading-tight text-neutral-700 dark:text-neutral-300">
                                  {lang === 'en' ? c.textEn : c.textBn}
                                </p>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Interactive Post input footer */}
                        <form id="form-reel-comment" onSubmit={handlePostComment} className="flex gap-2">
                          <input 
                            id="input-comment-text"
                            type="text" 
                            placeholder={t.addCommentPlace}
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                            className="flex-1 px-3 py-2 text-xs rounded-lg border border-emerald-500/20 bg-stone-50 dark:bg-stone-900 focus:ring-2 focus:ring-emerald-500/30 outline-none"
                          />
                          <button
                            id="btn-comment-submit"
                            type="submit"
                            className="bg-[#1A5319] dark:bg-[#4E9F3D] text-white px-3 py-2.5 rounded-lg active:scale-95 text-xs font-bold"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}


            {/* SCREEN STATE 3: THE SELLER PORTAL (FARMER DISPATCH & AGRO-SERVICES HUB) */}
            {activeScreen === 'dashboard' && portal === 'seller' && (
              <motion.div
                key="seller-dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-4 space-y-4"
              >
                {/* Segmented Controller for Farmer Portal (iOS premium glass design) */}
                <div className="grid grid-cols-3 gap-1 px-1 py-1 rounded-xl bg-white/45 dark:bg-stone-900/40 backdrop-blur-md border border-neutral-300/30 dark:border-white/10 shadow-sm">
                  <button
                    id="btn-seller-tab-analytics"
                    type="button"
                    onClick={() => {
                      setSellerSubTab('analytics');
                      showToast(lang === 'bn' ? 'বিক্রয় অ্যানালিটিক্স লোড হচ্ছে...' : 'Loading sales analytics dashboard...');
                    }}
                    className={`py-2 px-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer ${
                      sellerSubTab === 'analytics'
                        ? 'bg-[#1A5319] dark:bg-[#4E9F3D] text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span className="truncate">{lang === 'en' ? 'Sales metrics' : 'বিক্রয় ড্যাশক'}</span>
                  </button>
                  <button
                    id="btn-seller-tab-chats"
                    type="button"
                    onClick={() => {
                      setSellerSubTab('chats');
                      showToast(lang === 'bn' ? 'সক্রিয় ক্রেতা চ্যাট টার্মিনাল...' : 'Loading buyer transparency negotiations terminal...');
                    }}
                    className={`py-2 px-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer relative ${
                      sellerSubTab === 'chats'
                        ? 'bg-[#1A5319] dark:bg-[#4E9F3D] text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="truncate">{lang === 'en' ? 'Farmer Inbox' : 'ক্রেতা চ্যাট'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-1 right-1 animate-pulse" />
                  </button>
                  <button
                    id="btn-seller-tab-dispatch"
                    type="button"
                    onClick={() => {
                      setSellerSubTab('dispatch');
                      showToast(lang === 'bn' ? 'ফসল তালিকাভুক্তি টার্মিনাল...' : 'Loading yield dispatch terminal...');
                    }}
                    className={`py-2 px-1 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-1 cursor-pointer ${
                      sellerSubTab === 'dispatch'
                        ? 'bg-[#1A5319] dark:bg-[#4E9F3D] text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span className="truncate">{lang === 'en' ? 'New Yield' : 'নতুন চালান'}</span>
                  </button>
                </div>

                {sellerSubTab === 'analytics' ? (
                  <>
                    {/* 1. Metric Overview Cards (Amounts & Order Summary) */}
                    <div className="grid grid-cols-2 gap-2 font-mono">
                      <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                        theme === 'dark' ? 'bg-[#121212]/90 border-white/10' : 'bg-white border-neutral-200/50 shadow-sm'
                      }`}>
                        <span className="text-[8.5px] uppercase tracking-wider font-bold text-neutral-400">
                          {lang === 'en' ? 'Total Yield Revenue' : 'মোট অর্জিত বিক্রয়'}
                        </span>
                        <span className="text-sm font-bold text-[#1A5319] dark:text-[#4E9F3D] mt-1">
                          {analyticsFilter === 'day' 
                            ? convertNumber(293000, lang) + ' ৳'
                            : analyticsFilter === 'month' 
                            ? convertNumber(1070000, lang) + ' ৳' 
                            : convertNumber(4930000, lang) + ' ৳'}
                        </span>
                        <span className="text-[8px] text-emerald-500 font-semibold mt-0.5 flex items-center">
                          ▲ +{convertNumber('18.4', lang)}% {lang === 'en' ? 'vs last period' : 'পূর্বের তুলনায়'}
                        </span>
                      </div>

                      <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                        theme === 'dark' ? 'bg-[#121212]/90 border-white/10' : 'bg-white border-neutral-200/50 shadow-sm'
                      }`}>
                        <span className="text-[8.5px] uppercase tracking-wider font-bold text-neutral-400">
                          {lang === 'en' ? 'Escrow Protected' : 'এসক্রো সুরক্ষিত তহবিল'}
                        </span>
                        <span className="text-sm font-bold text-amber-500 mt-1">
                          {convertNumber(50900, lang)} ৳
                        </span>
                        <span className="text-[8px] text-neutral-400 font-semibold mt-0.5 flex items-center">
                          ● {convertNumber(2, lang)} {lang === 'en' ? 'active contract locks' : 'সক্রিয় এসক্রো চুক্তি'}
                        </span>
                      </div>

                      <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                        theme === 'dark' ? 'bg-[#121212]/90 border-white/10' : 'bg-white border-neutral-200/50 shadow-sm'
                      }`}>
                        <span className="text-[8.5px] uppercase tracking-wider font-bold text-neutral-400">
                          {lang === 'en' ? 'Certified Volume' : 'প্রত্যয়িত ফসলের পরিমাণ'}
                        </span>
                        <span className="text-xs font-bold text-neutral-800 dark:text-stone-100 mt-1">
                          {analyticsFilter === 'day' 
                            ? convertNumber('11.8', lang) + ' MT' 
                            : analyticsFilter === 'month' 
                            ? convertNumber('55.8', lang) + ' MT' 
                            : convertNumber('247.0', lang) + ' MT'}
                        </span>
                        <span className="text-[8px] text-[#1A5319] dark:text-[#4E9F3D] font-bold mt-0.5">
                          ✓ DAE Certify Approved
                        </span>
                      </div>

                      <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                        theme === 'dark' ? 'bg-[#121212]/90 border-white/10' : 'bg-white border-neutral-200/50 shadow-sm'
                      }`}>
                        <span className="text-[8.5px] uppercase tracking-wider font-bold text-neutral-400">
                          {lang === 'en' ? 'Settle Clearance' : 'খালাসকৃত সফল চুক্তি'}
                        </span>
                        <span className="text-xs font-bold text-neutral-800 dark:text-stone-100 mt-1">
                          {analyticsFilter === 'day' 
                            ? convertNumber(8, lang) + ' ' + (lang === 'en' ? 'Jobs' : 'টি')
                            : analyticsFilter === 'month' 
                            ? convertNumber(48, lang) + ' ' + (lang === 'en' ? 'Jobs' : 'টি')
                            : convertNumber(210, lang) + ' ' + (lang === 'en' ? 'Jobs' : 'টি')}
                        </span>
                        <span className="text-[8px] text-[#1A5319] dark:text-[#4E9F3D] font-bold mt-0.5">
                          ★ {convertNumber('4.9', lang)} rating avg
                        </span>
                      </div>
                    </div>

                    {/* 2. Interactive Graphical Chart Section */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      theme === 'dark' ? 'bg-[#121212]/90 border-stone-850 shadow-none' : 'bg-white border-emerald-500/15 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-xs font-bold text-[#1A5319] dark:text-[#4E9F3D] uppercase tracking-wider">
                            {lang === 'en' ? 'Agro-Yield Sales Trend' : 'ফসলের বিক্রয় প্রবণতা সূচক'}
                          </h4>
                          <p className="text-[8.5px] text-neutral-400 font-mono">
                            {lang === 'en' ? 'Real-time DAE synchronized analytics' : 'ডিএই থেকে সরাসরি সিঙ্ক করা গ্রাফিক্স সমাধান'}
                          </p>
                        </div>

                        {/* Chart filter buttons */}
                        <div className="flex bg-neutral-100 dark:bg-stone-900 border border-neutral-200/50 dark:border-white/5 p-0.5 rounded-lg">
                          {(['day', 'month', 'year'] as const).map((filter) => (
                            <button
                              key={filter}
                              onClick={() => {
                                setAnalyticsFilter(filter);
                                setHoveredChartIndex(null);
                              }}
                              className={`px-2 py-1 rounded text-[8px] font-bold uppercase transition-all duration-300 cursor-pointer ${
                                analyticsFilter === filter
                                  ? 'bg-[#1A5319] dark:bg-[#4E9F3D] text-white shadow-sm'
                                  : 'text-neutral-400 hover:text-neutral-200'
                              }`}
                            >
                              {filter === 'day' ? (lang === 'en' ? '7D' : '৭ দিন') : filter === 'month' ? (lang === 'en' ? '12M' : '১২ মাস') : (lang === 'en' ? '3Y' : '৩ বছর')}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* SVG line-graph render logic */}
                      {(() => {
                        // Let's configure custom data profiles for day, month, year
                        const chartData = analyticsFilter === 'day' 
                          ? [
                              { label: lang === 'en' ? "Sat" : "শনি", val: 24, mt: 1.2 },
                              { label: lang === 'en' ? "Sun" : "রবি", val: 31, mt: 1.6 },
                              { label: lang === 'en' ? "Mon" : "সোম", val: 18, mt: 0.9 },
                              { label: lang === 'en' ? "Tue" : "মঙ্গল", val: 45, mt: 2.2 },
                              { label: lang === 'en' ? "Wed" : "বুধ", val: 29, mt: 1.4 },
                              { label: lang === 'en' ? "Thu" : "বৃহ", val: 52, mt: 2.6 },
                              { label: lang === 'en' ? "Fri" : "শুক্র", val: 38, mt: 1.9 }
                            ]
                          : analyticsFilter === 'month'
                          ? [
                              { label: lang === 'en' ? "Jan" : "জানু", val: 120, mt: 6.0 },
                              { label: lang === 'en' ? "Feb" : "ফেব্রু", val: 175, mt: 8.8 },
                              { label: lang === 'en' ? "Mar" : "মার্চ", val: 140, mt: 7.0 },
                              { label: lang === 'en' ? "Apr" : "এপ্রিল", val: 210, mt: 10.5 },
                              { label: lang === 'en' ? "May" : "মে", val: 185, mt: 9.2 },
                              { label: lang === 'en' ? "Jun" : "জুন", val: 245, mt: 12.3 }
                            ]
                          : [
                              { label: "2024", val: 1150, mt: 58.0 },
                              { label: "2025", val: 1680, mt: 84.0 },
                              { label: "2026", val: 2100, mt: 105.0 }
                            ];

                        // Width & height values for graph canvas
                        const width = 340;
                        const height = 150;
                        const padding = 22;

                        // Calculate max value for coordinate scaling
                        const maxVal = Math.max(...chartData.map(d => d.val)) * 1.15;
                        const minVal = 0;

                        // Compute points coordinates
                        const points = chartData.map((d, idx) => {
                          const x = padding + (idx * (width - 2 * padding)) / (chartData.length - 1);
                          const y = height - padding - ((d.val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
                          return { x, y, ...d };
                        });

                        // Build path for stroke & gradient filling
                        const pathD = points.reduce((acc, p, idx) => {
                          return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
                        }, "");

                        const areaD = points.length > 0 
                          ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
                          : "";

                        return (
                          <div className="relative font-mono">
                            {/* Dynamic Floating interactive Tooltip inside the chart */}
                            <div className="h-[155px] w-full relative">
                              <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
                                <defs>
                                  <linearGradient id="glowArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4E9F3D" stopOpacity="0.3" />
                                    <stop offset="10%" stopColor="#4E9F3D" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#4E9F3D" stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>

                                {/* Guideline Grids */}
                                {[1, 2, 3].map((g) => {
                                  const yPos = padding + (g * (height - 2 * padding)) / 4;
                                  return (
                                    <line 
                                      key={g}
                                      x1={padding}
                                      y1={yPos}
                                      x2={width - padding}
                                      y2={yPos}
                                      stroke={theme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}
                                      strokeDasharray="2 3"
                                    />
                                  );
                                })}

                                {/* Area Layer */}
                                {areaD && (
                                  <path d={areaD} fill="url(#glowArea)" className="transition-all duration-300" />
                                )}

                                {/* Main Glowing Stroke Line */}
                                {pathD && (
                                  <path 
                                    d={pathD} 
                                    fill="none" 
                                    stroke={theme === 'dark' ? "#4E9F3D" : "#1A5319"} 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                    className="transition-all duration-300"
                                  />
                                )}

                                {/* Coordinates interactive point nodes */}
                                {points.map((p, idx) => (
                                  <g key={idx}>
                                    {/* Pulse circles for hovered points */}
                                    {hoveredChartIndex === idx && (
                                      <circle 
                                        cx={p.x} 
                                        cy={p.y} 
                                        r="8" 
                                        fill={theme === 'dark' ? "#4E9F3D" : "#1A5319"} 
                                        opacity="0.2" 
                                        className="animate-ping"
                                      />
                                    )}
                                    <circle 
                                      cx={p.x} 
                                      cy={p.y} 
                                      r={hoveredChartIndex === idx ? 5 : 3.5} 
                                      fill={hoveredChartIndex === idx ? "#FFF" : (theme === 'dark' ? "#4E9F3D" : "#1A5319")} 
                                      stroke={hoveredChartIndex === idx ? (theme === 'dark' ? "#4E9F3D" : "#1A5319") : "none"}
                                      strokeWidth="1.5"
                                      className="transition-all duration-200 cursor-pointer"
                                      onMouseEnter={() => setHoveredChartIndex(idx)}
                                      onMouseLeave={() => setHoveredChartIndex(null)}
                                    />
                                  </g>
                                ))}

                                {/* X-Axis labels */}
                                {points.map((p, idx) => (
                                  <text 
                                    key={idx}
                                    x={p.x}
                                    y={height - 5}
                                    textAnchor="middle"
                                    className="fill-neutral-400 font-bold font-mono"
                                    style={{ fontSize: '8px' }}
                                  >
                                    {p.label}
                                  </text>
                                ))}
                              </svg>
                            </div>

                            {/* Interactive Stats Details Box reflecting user's hovered coordinate node */}
                            {hoveredChartIndex !== null ? (
                              <div className="mt-2 p-2 bg-emerald-500/10 border border-emerald-500/25 rounded-lg flex items-center justify-between text-[9.5px]">
                                <div className="flex items-center space-x-2">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                  <span className="font-bold text-neutral-400">
                                    {points[hoveredChartIndex].label}:
                                  </span>
                                  <span className="font-bold text-neutral-700 dark:text-white">
                                    {convertNumber(points[hoveredChartIndex].val * (analyticsFilter === 'year' ? 1000 : 1000), lang)} ৳
                                  </span>
                                </div>
                                <span className="text-emerald-500 font-bold">
                                  {lang === 'en' ? 'Volume' : 'পরিমাণ'}: {convertNumber(points[hoveredChartIndex].mt, lang)} MT
                                </span>
                              </div>
                            ) : (
                              <div className="mt-2 p-2 bg-neutral-100 dark:bg-stone-900 border border-neutral-200/40 dark:border-white/5 rounded-lg text-center text-neutral-400 text-[9px]">
                                {lang === 'en' ? '👋 Hover over data nodes to inspect revenue metrics' : '👋 বিস্তারিত পরিমাপ যাচাই করতে গ্রাফের বিন্দুর ওপর মাউস রাখুন'}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* 3. Escrow Order Tracking Log list */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      theme === 'dark' ? 'bg-[#121212]/90 border-stone-850' : 'bg-white border-[#1A5319]/10'
                    }`}>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A5319] dark:text-[#4E9F3D] mb-3 flex items-center">
                        <Activity className="w-4 h-4 mr-1.5" />
                        {lang === 'en' ? 'Real-time Escrow Order Tracking' : 'বাস্তব-সময়ের এসক্রো অর্ডার ট্র্যাকিং'}
                      </h3>

                      {/* Simulated interactive order locks */}
                      <div className="space-y-3 font-mono text-xs">
                        {[
                          {
                            idx: 'AT-8924',
                            cropEn: 'Premium Gopalbhog Mangoes',
                            cropBn: 'প্রিমিয়াম গোপালভোগ আম',
                            buyer: lang === 'en' ? 'Aman Agro Foods' : 'আমান এগ্রো ফুডস',
                            amount: 38400,
                            qty: lang === 'en' ? '12 Maunds' : '১২ মণ',
                            status: 'TRANSIT',
                            statusLabelEn: 'DAE Checked Transit',
                            statusLabelBn: 'ডিএই জিপিএস ট্রানজিট',
                            color: 'text-sky-500 bg-sky-500/10 border-sky-500/25'
                          },
                          {
                            idx: 'AT-8812',
                            cropEn: 'Fresh Spinach (Palong Shak)',
                            cropBn: 'তাজা পালং শাক (লইট্যা গ্র্যাড)',
                            buyer: lang === 'en' ? 'M. Rahman (You / Self)' : 'এম রহমান (স্মার্ট হোল্ডিং)',
                            amount: 12500,
                            qty: lang === 'en' ? '278 KG' : '২৭৮ কেজি',
                            status: 'HELD',
                            statusLabelEn: 'Protected in Escrow',
                            statusLabelBn: 'এসক্রো সুরক্ষিত ফান্ড',
                            color: 'text-amber-500 bg-amber-500/10 border-amber-500/25'
                          },
                          {
                            idx: 'AT-8705',
                            cropEn: 'Fresh Spinach (Palong Shak)',
                            cropBn: 'তাজা পালং শাক (তাজা ফরম্যাট)',
                            buyer: lang === 'en' ? 'Dhaka Wholesale Corp' : 'ঢাকা পাইকারি ডিস্ট্রিবিউটর',
                            amount: 108000,
                            qty: lang === 'en' ? '2.4 Tons' : '২.৪ টন',
                            status: 'RELEASED',
                            statusLabelEn: 'Settled & Paid Out',
                            statusLabelBn: 'খালাসকৃত ও পেমেন্ট সম্পূর্ণ',
                            color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/25'
                          }
                        ].map((order) => (
                          <div key={order.idx} className="p-3 rounded-xl bg-neutral-100 dark:bg-stone-900 border border-neutral-200/50 dark:border-stone-850 space-y-2">
                            <div className="flex items-center justify-between border-b border-neutral-250 dark:border-white/5 pb-1.5 flex-wrap gap-1.5">
                              <span className="text-[10px] bg-neutral-200 dark:bg-stone-850 px-1.5 py-0.5 rounded font-bold text-stone-400">
                                {order.idx}
                              </span>
                              <span className={`text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${order.color}`}>
                                {lang === 'en' ? order.statusLabelEn : order.statusLabelBn}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-neutral-800 dark:text-stone-200">
                                {lang === 'en' ? order.cropEn : order.cropBn}
                              </h4>
                              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                                <span>{lang === 'en' ? `Buyer: ${order.buyer}` : `ক্রেতা: ${order.buyer}`}</span>
                                <span className="text-neutral-500">{order.qty}</span>
                              </div>
                            </div>

                            {/* Order timeline progress tracker */}
                            <div className="pt-1.5 space-y-1">
                              <div className="flex items-center justify-between text-[8px] text-neutral-400 font-bold uppercase tracking-widest pl-0.5">
                                <span className={order.status === 'HELD' || order.status === 'TRANSIT' || order.status === 'RELEASED' ? 'text-emerald-500 font-bold' : ''}>{lang === 'en' ? '1. Escrow' : '১. এসক্রো'}</span>
                                <span className={order.status === 'TRANSIT' || order.status === 'RELEASED' ? 'text-emerald-500 font-bold' : ''}>{lang === 'en' ? '2. Transit' : '২. ট্রানজিট'}</span>
                                <span className={order.status === 'RELEASED' ? 'text-emerald-500 font-bold' : ''}>{lang === 'en' ? '3. Settle' : '৩. সেটেল'}</span>
                              </div>
                              
                              <div className="h-1.5 w-full bg-neutral-200 dark:bg-stone-900 border border-neutral-300/35 dark:border-white/5 rounded-full overflow-hidden flex">
                                <div className={`h-full ${
                                  order.status === 'HELD' 
                                    ? 'w-1/3 bg-amber-500' 
                                    : order.status === 'TRANSIT' 
                                    ? 'w-2/3 bg-sky-500' 
                                    : 'w-full bg-emerald-505'
                                }`} />
                              </div>
                            </div>

                            <div className="flex justify-between items-center text-[10px] pt-1 font-bold">
                              <span className="text-neutral-400 font-mono">{lang === 'en' ? 'Payout target:' : 'পেমেন্ট গেটওয়ে:'} bKash wallet</span>
                              <span className="text-neutral-800 dark:text-stone-100">{convertNumber(order.amount, lang)} ৳</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : sellerSubTab === 'chats' ? (
                  <div className="space-y-3 font-sans">
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      theme === 'dark' ? 'bg-[#121212]/90 border-stone-850' : 'bg-white border-[#1A5319]/10 shadow-sm'
                    }`}>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A5319] dark:text-[#4E9F3D] mb-3 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1.5 text-emerald-500 animate-pulse" />
                        {lang === 'en' ? 'Active Buyer Enquiries & Escrow Inbox' : 'সক্রিয় ক্রেতা জিজ্ঞাসা ও চুক্তি'}
                      </h3>
                      
                      <div className="space-y-2.5">
                        {listings.map(item => {
                          const chat = chatsRegistry[item.id];
                          const lastMsg = chat?.messages[chat.messages.length - 1];
                          
                          return (
                            <div 
                              key={item.id}
                              className={`p-3 rounded-xl border flex items-center space-x-3 transition-all hover:scale-[1.01] ${
                                theme === 'dark' ? 'bg-stone-900/60 border-stone-850 hover:bg-stone-900' : 'bg-neutral-50 border-neutral-200/40 hover:bg-neutral-100/70'
                              }`}
                            >
                              <img 
                                src={item.imageUrl} 
                                alt={item.titleEn} 
                                referrerPolicy="no-referrer"
                                className="w-11 h-11 rounded-lg object-cover border border-neutral-350/10"
                              />
                              <div className="flex-1 min-w-0 text-left">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-neutral-800 dark:text-stone-100 truncate">
                                    {lang === 'en' ? chat?.buyerName || 'M. Rahman' : 'ক্রেতা রহমান'}
                                  </span>
                                  <span className="text-[9px] font-mono text-neutral-400 font-bold">
                                    {lastMsg ? lastMsg.timestamp : 'Active'}
                                  </span>
                                </div>
                                <p className="text-[10.5px] font-medium text-neutral-500 truncate mt-0.5">
                                  {lang === 'en' ? item.titleEn : item.titleBn}
                                </p>
                                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate font-mono mt-0.5 max-w-[200px] italic">
                                  ✉️ {lastMsg ? lastMsg.text : (lang === 'en' ? 'Open discussion panel' : 'চ্যাট প্যানেল চালু করুন')}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveChatListing(item);
                                  setSelectedChatRole('seller');
                                  showToast(lang === 'en' ? `Opening dialogue as Seller with ${chat?.buyerName || 'M. Rahman'}` : `বিক্রেতা হিসেবে ক্রেতার সাথে আলোচনা চালু হচ্ছে...`);
                                }}
                                className="px-2.5 py-1.5 bg-[#1A5319] hover:bg-emerald-800 dark:bg-[#4E9F3D] dark:hover:bg-emerald-600 text-white rounded-lg text-[9.5px] font-bold uppercase transition-all shadow-sm active:scale-95 pointer-events-auto shrink-0"
                              >
                                {lang === 'en' ? 'Reply' : 'উত্তর দিন'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* UPZILA AGRICULTURE EXTENSION DAE SECURED INTEGRATION */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      theme === 'dark' ? 'bg-[#121212]/90 border-[#4E9F3D]/20 shadow-none' : 'bg-white border-[#1A5319]/15 shadow-sm'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <img 
                          src={MOCK_SAAO.avatarUrl} 
                          referrerPolicy="no-referrer"
                          alt={MOCK_SAAO.nameEn} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5 flex-wrap">
                            <h3 className="text-xs font-bold leading-tight uppercase font-display text-[#1A5319] dark:text-[#4E9F3D]">
                              {t.daeHeader}
                            </h3>
                            <span className="bg-emerald-100 dark:bg-emerald-950 text-[#1A5319] dark:text-[#4E9F3D] text-[8px] font-bold px-1.5 py-0.5 rounded-full select-none font-mono">
                              {t.officerStatus}: LIVE
                            </span>
                          </div>
                          
                          <p className="text-[11px] font-bold mt-1 text-neutral-800 dark:text-stone-100 truncate">
                            {lang === 'en' ? MOCK_SAAO.nameEn : MOCK_SAAO.nameBn}
                          </p>
                          <p className="text-[9px] text-neutral-400 font-semibold leading-tight mt-0.5">
                            {lang === 'en' ? MOCK_SAAO.designationEn : MOCK_SAAO.designationBn}
                          </p>
                          <p className="text-[8px] text-emerald-500 dark:text-emerald-400 font-mono mt-0.5">
                            {lang === 'en' ? MOCK_SAAO.availabilityEn : MOCK_SAAO.availabilityBn}
                          </p>
                        </div>
                      </div>

                      <p className="text-[10px] text-neutral-400 mt-2 font-mono leading-relaxed bg-[#F4F6F4]/50 dark:bg-stone-900 border border-emerald-500/5 p-1.5 rounded-lg">
                        {t.daeSub}
                      </p>

                      {/* Active functional CTA Communication Buttons */}
                      <div className="flex gap-2 mt-3">
                        <a 
                          id="btn-dae-call"
                          href={`tel:${MOCK_SAAO.contact}`}
                          onClick={() => showToast(lang === 'bn' ? `কল করা হচ্ছে: ${MOCK_SAAO.contact}` : `Initiating telecom call to SAAO: ${MOCK_SAAO.contact}`)}
                          className="flex-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 border border-emerald-500/30 text-[#1A5319] dark:text-[#4E9F3D] py-2 px-3 rounded-xl text-[10px] font-bold font-sans transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{t.callOfficer}</span>
                        </a>
                        
                        <button 
                          id="btn-dae-msg-trigger"
                          type="button"
                          onClick={() => setSaaoSupportOpen(true)}
                          className="flex-1 bg-[#1A5319] hover:bg-emerald-800 dark:bg-[#4E9F3D] dark:hover:bg-emerald-600 text-white py-2 px-3 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{t.msgOfficer}</span>
                        </button>
                      </div>
                    </div>

                    {/* FARMER DISPATCH CROP LISTING ENGINE */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      theme === 'dark' ? 'bg-[#121212]/90 border-stone-850' : 'bg-white border-[#1A5319]/10'
                    }`}>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A5319] dark:text-[#4E9F3D] mb-3 flex items-center">
                        <PlusCircle className="w-4 h-4 mr-1.5" />
                        {t.cropDetailHeader}
                      </h3>

                      <form id="form-seller-dispatch" onSubmit={handleNewCropSubmit} className="space-y-3 font-mono">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                            {t.cropTitleLabel}
                          </label>
                          <input 
                            id="input-crop-title"
                            type="text" 
                            required
                            placeholder={t.cropPlaceholder}
                            value={cropTitle}
                            onChange={(e) => setCropTitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-500/20 bg-stone-50 dark:bg-[#0A0A0A] focus:ring-2 focus:ring-emerald-500/30 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                            {lang === 'en' ? 'Agro Category' : 'কৃষি পণ্য বিভাগ'}
                          </label>
                          <select 
                            id="select-crop-category"
                            value={cropCategory}
                            onChange={(e) => setCropCategory(e.target.value)}
                            className="w-full px-2 py-2 text-xs rounded-lg border border-emerald-500/20 bg-[#F4F6F4] dark:bg-[#0A0A0A] focus:ring-2 focus:ring-emerald-500/30 outline-none"
                          >
                            <option value="vegetables">{t.cat_vegetables}</option>
                            <option value="fruits">{t.cat_fruits}</option>
                            <option value="dry_fruits">{t.cat_dry_fruits}</option>
                            <option value="grains">{t.cat_grains}</option>
                            <option value="chickens">{t.cat_chickens}</option>
                            <option value="ducks">{t.cat_ducks}</option>
                            <option value="beef">{t.cat_beef}</option>
                            <option value="cows">{t.cat_cows}</option>
                            <option value="goats">{t.cat_goats}</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                              {t.unitLabel}
                            </label>
                            <select 
                              id="select-crop-unit"
                              value={cropUnit}
                              onChange={(e) => setCropUnit(e.target.value)}
                              className="w-full px-2 py-2 text-xs rounded-lg border border-emerald-500/20 bg-[#F4F6F4] dark:bg-[#0A0A0A] focus:ring-2 focus:ring-emerald-500/30 outline-none"
                            >
                              <option value="KG">KG (কেজি)</option>
                              <option value="Maund">Maund (মণ)</option>
                              <option value="Ton">Ton (টন)</option>
                              <option value="Piece">Piece (পিস)</option>
                              <option value="Head">Head (টি)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                              {t.priceLabel}
                            </label>
                            <input 
                              id="input-crop-price"
                              type="number" 
                              required
                              placeholder="e.g. 45"
                              value={cropPrice}
                              onChange={(e) => setCropPrice(e.target.value.replace(/\D/g, ''))}
                              className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-500/20 bg-stone-50 dark:bg-[#0A0A0A] focus:ring-2 focus:ring-emerald-500/30 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 mb-1">
                            {t.zoneSelectLabel}
                          </label>
                          <div className="grid grid-cols-3 gap-1">
                            {['Flash', 'Buffer', 'Vault'].map((zoneOpt) => (
                              <button
                                key={zoneOpt}
                                id={`btn-select-zone-${zoneOpt}`}
                                type="button"
                                onClick={() => setCropZone(zoneOpt as any)}
                                className={`py-2 px-1 text-[9px] font-bold rounded-lg border transition-all truncate ${
                                  cropZone === zoneOpt
                                    ? 'bg-[#1A5319] dark:bg-[#4E9F3D] text-white border-transparent'
                                    : 'bg-neutral-50 dark:bg-[#0A0A0A] border-emerald-500/10 text-neutral-400 hover:border-emerald-500/20'
                                }`}
                              >
                                {zoneOpt === 'Flash' ? t.zone_flash.split(' ')[0] : zoneOpt === 'Buffer' ? t.zone_buffer.split(' ')[0] : t.zone_vault.split(' ')[0]}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* INTERACTIVE MOCK CAMERA BOX */}
                        <div className="pt-1">
                          <div 
                            onClick={triggerCameraMock}
                            className={`border-2 border-dashed border-emerald-500/20 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/10 transition-all ${
                              capturedImage ? 'h-32' : 'h-24'
                            }`}
                            title="Upload Crop Photo Proof"
                          >
                            {cameraActive ? (
                              <div className="text-center">
                                <span className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin inline-block mb-1" />
                                <p className="text-[10px] text-emerald-500 font-bold">{t.recordingActive}</p>
                              </div>
                            ) : capturedImage ? (
                              <div className="w-full h-full relative">
                                <img 
                                  src={capturedImage} 
                                  referrerPolicy="no-referrer"
                                  alt="Crop Proof Preview" 
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                  <Camera className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            ) : (
                              <>
                                <Camera className="w-6 h-6 text-neutral-400 mb-1.5" />
                                <span className="text-[10.5px] font-semibold text-[#1A5319] dark:text-[#4E9F3D] text-center">
                                  {t.uploadProof}
                                </span>
                                <span className="text-[9px] text-neutral-400 text-center mt-0.5">
                                  {lang === 'en' ? 'Proof of Freshness algorithm active' : 'তাজা ফসল পরিমাপক অ্যালগরিদম সক্রিয়'}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          id="btn-crop-publish"
                          type="submit"
                          disabled={publishing}
                          className="w-full bg-[#1A5319] hover:bg-emerald-800 dark:bg-[#4E9F3D] dark:hover:bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                        >
                          {publishing ? (
                            <>
                              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              <span>{lang === 'en' ? 'Hashing Ledger...' : 'লেজার রেজিস্ট্রি হচ্ছে...'}</span>
                            </>
                          ) : (
                            <>
                              <Video className="w-4 h-4 text-emerald-300" />
                              <span>{t.publishBtn}</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </>
                )}

              </motion.div>
            )}


            {/* SCREEN STATE 4: THE SYSTEM CONFIGURATION & SETTINGS HUB */}
            {activeScreen === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-4 space-y-4"
              >
                
                {/* Verified Citizen Identity container locking verified NID metrics */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark' ? 'bg-[#121212]/90 border-stone-800 shadow-none' : 'bg-white border-[#1A5319]/10 shadow-sm'
                }`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-emerald-500" />
                    {t.identityHeader}
                  </h3>

                  <div className="flex items-center space-x-3 bg-emerald-50/50 dark:bg-stone-900/50 p-2.5 rounded-xl border border-emerald-500/10 mb-4 animate-fade-in">
                    <div className="relative group">
                      <div className="w-12 h-12 rounded-full bg-emerald-700/10 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 border-2 border-emerald-500/20 overflow-hidden">
                        {profilePhoto ? (
                          <img 
                            src={profilePhoto} 
                            alt="Profile" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      {profilePhoto && (
                        <button 
                          onClick={() => setProfilePhoto(null)} 
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 shadow-sm"
                          title="Clear Photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-neutral-400">{t.citizenName}</p>
                      <p className="text-xs font-bold truncate text-[#1A5319] dark:text-[#4E9F3D]">
                        {registeredName}
                      </p>
                      <p className="text-[9px] font-mono text-neutral-400 mt-0.5">
                        {t.nidCard}: {nidNumber ? nidNumber.substring(0, 4) + 'XXXX' + nidNumber.substring(nidNumber.length-3) : '1994XXXXXX621'}
                      </p>
                    </div>
                    <div className="ml-auto bg-emerald-100 dark:bg-emerald-950 text-[#1A5319] dark:text-emerald-400 text-[9px] font-bold px-2 py-1 rounded-md flex items-center">
                      <Check className="w-3 h-3 mr-0.5 animate-pulse" />
                      SECURE
                    </div>
                  </div>

                  {/* Profile Photo Action Terminal */}
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900 shadow-inner rounded-xl space-y-3 border border-neutral-200/50 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                        {lang === 'en' ? 'Profile Customizer' : 'প্রোফাইল ছবি অপশন'}
                      </span>
                      <span className="text-[8px] font-mono text-emerald-500 bg-emerald-500/10 px-1 rounded animate-pulse">
                        LIVE
                      </span>
                    </div>

                    {/* Photo error alert */}
                    {profilePhotoError && (
                      <div className="p-2.5 text-[10px] bg-red-500/10 text-red-500 dark:text-red-400 rounded-md border border-red-500/20 space-y-2">
                        <div className="flex items-start">
                          <AlertCircle className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 mt-0.5 text-red-500 dark:text-red-400" />
                          <div className="flex-1">
                            <span className="font-bold">{profilePhotoError}</span>
                            <span className="block mt-1 font-mono text-[9px] text-neutral-500 dark:text-neutral-400 leading-snug">
                              {lang === 'en' 
                                ? "Tip: Browsers block camera access inside sandboxed iframes. Tap 'Use Demo Portrait' or configure 'AI Avatar' below." 
                                : "পরামর্শ: আইফ্রেমের কারণে ক্যামেরা ব্লক হতে পারে। 'ডেমো ছবি' অথবা 'এআই অবতার' বাটন চাপুন।"}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-1.5 border-t border-red-500/15">
                          <button
                            type="button"
                            onClick={() => {
                              const placeholderUrls = [
                                'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=300&h=300',
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
                                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
                              ];
                              const randomUrl = placeholderUrls[Math.floor(Math.random() * placeholderUrls.length)];
                              setProfilePhoto(randomUrl);
                              setProfilePhotoError(null);
                              showToast(lang === 'en' ? 'Loaded secure backup portrait!' : 'সংরক্ষিত পোর্ট্রেট ছবি লোড করা হয়েছে!');
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded text-[9px] cursor-pointer transition-all"
                          >
                            {lang === 'en' ? 'Use Demo Portrait' : 'ডেমো ছবি ব্যবহার করুন'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProfilePhotoError(null);
                              generateAiAvatar();
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-2 py-1 rounded text-[9px] cursor-pointer transition-all"
                          >
                            {lang === 'en' ? 'Trigger AI Engine' : 'এআই অবতার তৈরি করুন'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Main Actions selector */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          if (profileCameraActive) {
                            stopProfileCamera();
                          } else {
                            startProfileCamera();
                          }
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                          profileCameraActive 
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' 
                            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-[#1A5319] dark:text-emerald-400 border border-emerald-500/20 shadow-sm'
                        }`}
                      >
                        <Camera className="w-4 h-4" />
                        <span>
                          {profileCameraActive 
                            ? (lang === 'en' ? 'Stop Camera' : 'বন্ধ করুন') 
                            : (lang === 'en' ? 'Device Camera' : 'ক্যামেরা ছবি')}
                        </span>
                      </button>

                      <button
                        disabled={aiGenerating}
                        onClick={generateAiAvatar}
                        className="py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 shadow-md"
                      >
                        <Sliders className="w-4 h-4 text-purple-200" />
                        <span>
                          {aiGenerating 
                            ? (lang === 'en' ? 'Synthesizing...' : 'তৈরি হচ্ছে...') 
                            : (lang === 'en' ? 'AI Avatar' : 'এআই অবতার')}
                        </span>
                      </button>
                    </div>

                    {/* 1. CAMERA INTERACTIVE PORT */}
                    {profileCameraActive && (
                      <div className="relative rounded-lg overflow-hidden border-2 border-emerald-500/30 bg-black flex flex-col items-center">
                        <video 
                          ref={profileVideoRef} 
                          className="w-full h-44 object-cover scale-x-[-1]"
                          playsInline 
                          muted 
                        />
                        <div className="absolute inset-0 border border-white/10 pointer-events-none flex items-center justify-center">
                          {/* Targeting Guide Overlay box */}
                          <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-500/70" />
                        </div>
                        <div className="p-2 bg-neutral-900 border-t border-stone-800 w-full flex justify-between items-center text-[10px] text-white">
                          <span>👤 Align face in frame</span>
                          <button
                            onClick={captureProfilePhoto}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-3 rounded-full flex items-center space-x-1"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Capture' : 'ছবি তুলুন'}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2. AI GENERATION CONFIGURATOR */}
                    <div className="p-2 border border-neutral-200/50 dark:border-neutral-800 rounded-lg space-y-2.5 bg-neutral-100/30 dark:bg-[#0c0c0c]">
                      <div className="flex items-center space-x-1">
                        <Sliders className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-[10px] font-mono uppercase font-bold text-stone-400">
                          {lang === 'en' ? 'AI Model Setup & Presets' : 'এআই মডেল প্যারামিটার'}
                        </span>
                      </div>

                      {/* Custom Prompt field */}
                      <div className="space-y-1">
                        <label className="text-[9px] text-neutral-400 italic block">
                          {lang === 'en' ? 'Opt for custom AI text prompt constraint (or leave empty for presets)' : 'কাস্টম টেক্সট নির্দেশ দিন (ঐচ্ছিক)'}
                        </label>
                        <input
                          type="text"
                          value={customAiPrompt}
                          onChange={(e) => setCustomAiPrompt(e.target.value)}
                          placeholder={lang === 'en' ? "e.g., Bangladeshi field farmer, modern vector..." : "যেমন: বাংলাদেশি কৃষক, ভেক্টর আর্ট..."}
                          className="w-full text-[11px] p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent text-emerald-800 dark:text-emerald-300 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      {/* Presets Grid */}
                      {!customAiPrompt.trim() && (
                        <div className="space-y-1">
                          <span className="text-[9px] text-neutral-400 block">{lang === 'en' ? 'Select preset concept vibe:' : 'অবতার ডিজাইন বৈচিত্র্য চয়ন করুন:'}</span>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                            {[
                              { id: 'farmer_green', label_en: 'Green Farmer', label_bn: 'কৃষক লিডার' },
                              { id: 'agrotech', label_en: 'AgroTech Scout', label_bn: 'স্মার্ট পরামর্শক' },
                              { id: 'saao', label_en: 'SAAO Officer', label_bn: 'এসএএও কর্মকর্তা' },
                              { id: 'trader', label_en: 'Wholesale Trader', label_bn: 'পাইকারি ব্যবসায়ী' },
                              { id: 'golden_grain', label_en: 'Grain Specialist', label_bn: 'ধান সংগ্রাহক' }
                            ].map((preset) => (
                              <button
                                key={preset.id}
                                onClick={() => setSelectedPreset(preset.id)}
                                className={`py-1 px-1.5 rounded-md text-left truncate transition-all ${
                                  selectedPreset === preset.id 
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 font-bold' 
                                    : 'hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400'
                                }`}
                              >
                                <span>{lang === 'en' ? preset.label_en : preset.label_bn}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Regional Localization section with segmented tabs */}
                <div className={`p-4 rounded-2xl border transition-all duration-305 ${
                  theme === 'dark' ? 'bg-[#121212]/90 border-stone-800 shadow-none' : 'bg-white border-[#1A5319]/10 shadow-sm'
                }`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center">
                    <Sliders className="w-4 h-4 mr-1 text-emerald-500" />
                    {t.systemConfig}
                  </h3>

                  <div className="space-y-3 font-mono text-xs">
                    
                    {/* Core Language setup */}
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 mb-1.5">{t.langLabel}</p>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-150 dark:bg-stone-900/40 p-1 rounded-lg border border-emerald-500/5">
                        <button 
                          id="btn-lang-en"
                          onClick={() => setLang('en')}
                          className={`py-1.5 px-2 rounded-md font-bold text-[11px] transition-all ${
                            lang === 'en' 
                              ? 'bg-[#1A5319] text-white dark:bg-[#4E9F3D]' 
                              : 'text-neutral-400 bg-transparent hover:text-neutral-200'
                          }`}
                        >
                          English
                        </button>
                        <button 
                          id="btn-lang-bn"
                          onClick={() => setLang('bn')}
                          className={`py-1.5 px-2 rounded-md font-semibold text-[11px] transition-all ${
                            lang === 'bn' 
                              ? 'bg-[#1A5319] text-white dark:bg-[#4E9F3D]' 
                              : 'text-neutral-400 bg-transparent hover:text-neutral-200'
                          }`}
                        >
                          বাংলা (Bangla)
                        </button>
                      </div>
                    </div>

                    {/* Interface theme setup */}
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 mb-1.5">{t.themeLabel}</p>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-150 dark:bg-stone-900/40 p-1 rounded-lg border border-emerald-500/5">
                        <button 
                          id="btn-theme-light"
                          onClick={() => setTheme('light')}
                          className={`py-1.5 px-2 rounded-md text-[11px] transition-all flex items-center justify-center space-x-1 ${
                            theme === 'light' 
                              ? 'bg-[#1A5319] text-white' 
                              : 'text-neutral-400 bg-transparent hover:text-neutral-200'
                          }`}
                        >
                          <Sun className="w-3.5 h-3.5 mr-1" />
                          <span>Light Mode</span>
                        </button>
                        <button 
                          id="btn-theme-dark"
                          onClick={() => setTheme('dark')}
                          className={`py-1.5 px-2 rounded-md text-[11px] transition-all flex items-center justify-center space-x-1 ${
                            theme === 'dark' 
                              ? 'bg-[#4E9F3D] text-white' 
                              : 'text-neutral-400 bg-transparent hover:text-neutral-200'
                          }`}
                        >
                          <Moon className="w-3.5 h-3.5 mr-1" />
                          <span>Dark Mode</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Financial Clearing Account Forms */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark' ? 'bg-[#121212]/90 border-stone-800' : 'bg-white border-emerald-50/80 shadow-sm'
                }`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center">
                    <Coins className="w-4 h-4 mr-1 text-emerald-500" />
                    {t.financialClearing}
                  </h3>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-500/20">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4 text-indigo-400" />
                          <span className="font-bold text-[11px] text-indigo-600 dark:text-indigo-400">{bankAccount.bankName}</span>
                        </div>
                        <span className="text-[8px] bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold px-1.5 py-0.5 rounded">
                          PENNY-DROP: OK
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-semibold">{bankAccount.holderName}</p>
                      <div className="flex justify-between text-[9px] text-neutral-400 mt-1">
                        <span>A/C: {bankAccount.accountNo}</span>
                        <span>Routing: {bankAccount.routingNo}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-500/20">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          <Smartphone className="w-4 h-4 text-rose-400" />
                          <span className="font-bold text-[11px] text-rose-600 dark:text-rose-400">{t.bkashLabel}</span>
                        </div>
                        <span className="text-[8px] bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 font-bold px-1.5 py-0.5 rounded">
                          CONNECTED
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                        <span>Phone: {mfsWallets.bkash.phone}</span>
                        <span className="font-bold text-[#1A5319] dark:text-[#4E9F3D]">{formatCurrency(mfsWallets.bkash.balance, lang)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Geolocation Block & Telemetry */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark' ? 'bg-[#121212]/90 border-stone-850' : 'bg-white border-[#1A5319]/10'
                }`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center">
                    <Activity className="w-4 h-4 mr-1 text-emerald-500 animate-pulse" />
                    {t.locationTelemetry}
                  </h3>

                  <div className="flex items-center justify-between bg-[#F4F6F4] dark:bg-[#0A0A0A] p-3 rounded-xl border border-emerald-500/5 text-xs font-mono">
                    <div>
                      <p className="text-[10px] text-neutral-400">GPS Accuracy Readout</p>
                      <p className="font-bold text-emerald-600 dark:text-[#4E9F3D] text-sm mt-0.5">
                        {calibratingGps ? 'Pinging...' : gpsAccuracy}
                      </p>
                      <p className="text-[9px] text-[#212121]/50 dark:text-stone-400 mt-0.5">🛰️ {gpsSatellites} active telemetry sources</p>
                    </div>

                    <button
                      id="btn-recalibrate-gps"
                      onClick={triggerGpsCalibration}
                      disabled={calibratingGps}
                      className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-500/20 text-[#1A5319] dark:text-[#4E9F3D] px-3 py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all"
                    >
                      {calibratingGps ? 'Calibrating...' : t.recalibrateBtn}
                    </button>
                  </div>
                </div>

                {/* Software version footprint */}
                <div className="text-center text-[9px] text-neutral-400 font-mono mt-2">
                  <p>AGROTRUST PLATFORM CLIENT BUILD v4.8(26)</p>
                  <p>DIGITAL ESCROW ENGINE ACTIVE: SECUR_V2_MFS</p>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>


        {/* TRANSPARENT TRANSACTIONAL CHATBOX OVERLAY */}
        <AnimatePresence>
          {activeChatListing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex flex-col justify-end"
            >
              {/* Tap background to minimize */}
              <div className="flex-1" onClick={() => setActiveChatListing(null)} />
              
              <motion.div
                initial={{ y: 350 }}
                animate={{ y: 0 }}
                exit={{ y: 350 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className={`rounded-t-[32px] p-4 shadow-2xl flex flex-col h-[90%] max-h-[640px] overflow-hidden border-t ${
                  theme === 'dark' ? 'bg-[#121212] border-stone-850' : 'bg-white border-neutral-200'
                }`}
              >
                {/* Header widget */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-350/20">
                  <div className="flex items-center space-x-2.5">
                    <button 
                      onClick={() => setActiveChatListing(null)}
                      className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-stone-900 transition-all text-neutral-400 hover:text-neutral-200"
                    >
                      <X className="w-5 h-5 pointer-events-auto" />
                    </button>
                    <div>
                      <h3 className="text-xs font-bold font-mono text-[#1A5319] dark:text-[#4E9F3D] uppercase tracking-wider flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                        {lang === 'en' ? 'AgroTrust Transparent Chat' : 'এগ্রোট্রাস্ট নিরাপদ চ্যাট'}
                      </h3>
                      <p className="text-[11px] font-sans font-medium text-neutral-500 truncate max-w-[180px]">
                        {lang === 'en' ? activeChatListing.titleEn : activeChatListing.titleBn}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic interactive sandboxed role-toggling tab */}
                  <div className="flex bg-neutral-100 dark:bg-[#1a1a1a] rounded-lg p-0.5 border border-neutral-200/40 dark:border-stone-850">
                    <button
                      type="button"
                      onClick={() => setSelectedChatRole('buyer')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold font-sans transition-all pointer-events-auto ${
                        selectedChatRole === 'buyer' 
                          ? 'bg-[#1A5319] text-white shadow-sm' 
                          : 'text-neutral-450 hover:text-neutral-200'
                      }`}
                    >
                      {lang === 'en' ? 'Buyer 👤' : 'ক্রেতা'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedChatRole('seller')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold font-sans transition-all pointer-events-auto ${
                        selectedChatRole === 'seller' 
                          ? 'bg-[#1A5319] text-white shadow-sm' 
                          : 'text-neutral-450 hover:text-neutral-200'
                      }`}
                    >
                      {lang === 'en' ? 'Seller 🌾' : 'বিক্রেতা'}
                    </button>
                  </div>
                </div>

                {/* Sub-header instruction */}
                <div className="flex items-center justify-between text-[9.5px] px-2 py-1.5 bg-yellow-500/10 border-b border-yellow-500/10 text-yellow-650 dark:text-yellow-405 font-mono">
                  <span>
                    💬 {lang === 'en' ? 'Talking as ' : 'কথা বলছেন: '}
                    <strong>{selectedChatRole === 'buyer' ? (lang === 'en' ? 'Buyer (Rahman)' : 'ক্রেতা (রহমান)') : (lang === 'en' ? `Seller (${activeChatListing.sellerEn})` : `বিক্রেতা (${activeChatListing.sellerBn})`)}</strong>
                  </span>
                  {selectedChatRole === 'seller' && (
                    <button
                      type="button"
                      onClick={() => sendOrderFormFromSeller(activeChatListing.id)}
                      className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold flex items-center space-x-1 animate-pulse pointer-events-auto whitespace-nowrap"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>{lang === 'en' ? 'Send Order Form' : 'অর্ডার ফর্ম পাঠান'}</span>
                    </button>
                  )}
                </div>

                {/* Chat feed list */}
                <div className="flex-1 overflow-y-auto py-3 space-y-3 px-1" id="chatbox-messages-scroll">
                  {(chatsRegistry[activeChatListing.id]?.messages || []).map((msg) => {
                    const isSelf = msg.sender === selectedChatRole;
                    
                    return (
                      <div 
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${
                          isSelf ? 'ml-auto items-end' : 'mr-auto items-start'
                        }`}
                      >
                        {/* Name Indicator */}
                        <span className="text-[9px] text-neutral-450 mb-0.5 font-bold px-1 uppercase tracking-tight">
                          {msg.sender === 'buyer' ? (lang === 'en' ? 'Buyer Rahman' : 'ক্রেতা রহমান') : (lang === 'en' ? msg.sender : 'বিক্রেতা')}
                        </span>

                        {/* Interactive conditional components based on type */}
                        {msg.type === 'text' && (
                          <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed shadow-sm font-sans ${
                            isSelf 
                              ? 'bg-[#1A5319] text-white rounded-tr-none' 
                              : 'bg-neutral-100 dark:bg-stone-900 text-neutral-800 dark:text-neutral-100 rounded-tl-none border border-neutral-200/50 dark:border-stone-850'
                          }`}>
                            <p>{msg.text}</p>
                          </div>
                        )}

                        {msg.type === 'voice' && (
                          <div className={`p-2.5 rounded-2xl text-[11.5px] shadow-sm flex items-center space-x-2.5 ${
                            isSelf 
                              ? 'bg-emerald-750 text-white rounded-tr-none' 
                              : 'bg-neutral-100 dark:bg-stone-900 text-neutral-800 dark:text-neutral-100 rounded-tl-none border border-[#1A5319]/10'
                          }`}>
                            <button
                              type="button"
                              onClick={() => msg.voiceUrl && playVoiceNote(msg.id, msg.voiceUrl)}
                              className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:scale-90 pointer-events-auto"
                            >
                              {playingVoiceId === msg.id ? (
                                <span className="flex space-x-0.5 items-center justify-center">
                                  <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
                                  <span className="w-1 h-4 bg-white rounded-full animate-pulse delay-75" />
                                  <span className="w-1 h-3 bg-white rounded-full animate-pulse delay-150" />
                                </span>
                              ) : (
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              )}
                            </button>
                            <div className="flex-1 min-w-[100px] text-left">
                              <div className="flex items-center space-x-1">
                                {[...Array(8)].map((_, i) => (
                                  <span 
                                    key={i} 
                                    className={`w-0.5 rounded-full ${
                                      playingVoiceId === msg.id ? 'animate-bounce' : ''
                                    } ${
                                      isSelf ? 'bg-white' : 'bg-emerald-500'
                                    }`}
                                    style={{ 
                                      height: `${Math.random() * 12 + 4}px`,
                                      animationDelay: `${i * 100}ms`
                                    }}
                                  />
                                ))}
                              </div>
                              <span className="text-[9px] block text-neutral-450 font-mono mt-0.5">
                                {lang === 'en' ? `SpeakNote • ${msg.voiceDuration || 4}s` : `ভয়েস নোট • ${convertNumber(msg.voiceDuration || 4, lang)} সেকেন্ড`}
                              </span>
                            </div>
                          </div>
                        )}

                        {msg.type === 'order_form' && (
                          <div className="w-full text-left my-1">
                            <ChatOrderForm 
                              msg={msg} 
                              lang={lang}
                              onSubmit={(updatedFields) => submitOrderFormInChat(msg.id, updatedFields)}
                              unitPrice={parseFloat((activeChatListing.pricePerUnitEn || '50').replace(/[^0-9.]/g, ''))}
                            />
                          </div>
                        )}

                        {msg.type === 'order_summary' && (
                          <div className="w-full text-left my-1 p-3 bg-stone-900 border-2 border-emerald-500/40 rounded-2xl shadow-xl space-y-2">
                            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1 text-[#4E9F3D]">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider flex items-center">
                                <Shield className="w-3.5 h-3.5 mr-1 text-emerald-450 animate-pulse" />
                                AgroTrust Escrow Secured
                              </span>
                              <span className="bg-emerald-800 text-white font-mono font-bold text-[8px] px-1.5 py-0.5 rounded">
                                ESCROWED
                              </span>
                            </div>
                            <div className="space-y-1.5 text-left text-neutral-300 font-sans">
                              <p className="text-[11px] leading-snug">
                                {lang === 'en' 
                                  ? `A high-security escrow transaction has been initialized. ${convertNumber(msg.orderFormData?.quantity || '100', 'en')} ${msg.orderFormData?.unit || 'KG'} of food grade biology weight locked.`
                                  : `নিরাপদ এসক্রো ডিপোজিট সফলভাবে সংরক্ষিত হয়েছে। খাদ্য নিরাপত্তার জন্য ${convertNumber(msg.orderFormData?.quantity || '100', 'bn')} ${msg.orderFormData?.unit || 'কেজি'} ফসল লক করা হয়েছে।`}
                              </p>
                              
                              <div className="p-2 rounded bg-neutral-950 text-[10px] font-mono border border-neutral-850 grid grid-cols-2 gap-y-1 gap-x-2">
                                <span className="text-neutral-450">{lang === 'en' ? 'Deposit volume' : 'ডিপোজিট ভলিউম'}:</span>
                                <span className="text-right text-emerald-400 font-bold">{convertNumber(msg.orderFormData?.amount || '0', lang)} BDT</span>
                                
                                <span className="text-neutral-450">{lang === 'en' ? 'Consignee Name' : 'ক্রেতা'}:</span>
                                <span className="text-right truncate">{msg.orderFormData?.name}</span>
                                
                                <span className="text-neutral-450">{lang === 'en' ? 'Agro Delivery Link' : 'ডেলিভারি ঠিকানা'}:</span>
                                <span className="text-right truncate">{msg.orderFormData?.address}</span>
                              </div>

                              <div className="flex space-x-1 mt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveChatListing(null);
                                    setActiveCheckoutListing(activeChatListing);
                                    setCheckoutStep('success'); // proceed to tracking directly!
                                  }}
                                  className="w-full bg-[#1A5319] hover:bg-emerald-800 font-bold text-white text-[9.5px] py-1 px-2 rounded-lg text-center transition-all cursor-pointer pointer-events-auto"
                                >
                                  {lang === 'en' ? '⚡ Open Delivery & Transit Radar' : '⚡ লাইভ ডেলিভারি ও রুট রাডার ওয়ান করুন'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Message Timestamp */}
                        <span className="text-[8px] text-neutral-400 mt-1 block px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Chatbox keyboard/input footer with voice triggers */}
                <div className="border-t border-neutral-250/20 pt-2 pb-1 bg-[#101010]/5 dark:bg-[#121212]/5">
                  {isRecordingVoice ? (
                    <div className="p-2 border border-red-500/20 bg-red-500/10 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-red-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <span className="text-xs font-mono font-bold">
                          {lang === 'en' ? `Recording Voice note: 00:${voiceSecs < 10 ? '0' : ''}${voiceSecs}s` : `ভয়েস রেকর্ড হচ্ছে: 00:${convertNumber(voiceSecs, 'bn')} সেন্ট`}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => stopVoiceRecording(true)}
                          className="px-2.5 py-1 text-[10px] uppercase font-bold text-neutral-400 hover:text-white pointer-events-auto"
                        >
                          {lang === 'en' ? 'Cancel' : 'বাতিল'}
                        </button>
                        <button
                          type="button"
                          onClick={() => stopVoiceRecording(false)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] uppercase rounded-lg pointer-events-auto flex items-center space-x-1"
                        >
                          <Square className="w-3 h-3 fill-current" />
                          <span>{lang === 'en' ? 'Stop & Send' : 'স্টপ ও সেন্ড'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form 
                      onSubmit={sendChatMessage}
                      className="flex items-center space-x-1.5"
                    >
                      {/* Speech typing trigger */}
                      <button
                        type="button"
                        onClick={toggleSpeechRecognition}
                        className={`p-2.5 rounded-xl border transition-all pointer-events-auto ${
                          isSpeechTranslating 
                            ? 'bg-purple-650 text-white border-purple-500 animate-pulse' 
                            : 'bg-[#1A5319]/10 text-[#1A5319] dark:text-emerald-450 border-[#1A5319]/20 hover:bg-[#1A5319]/25'
                        }`}
                        title={lang === 'en' ? "Voice Input Transcription" : "ভয়েস টু টেক্সট লিখন"}
                      >
                        <Mic className="w-4 h-4" />
                      </button>

                      {/* Direct sound recording memo */}
                      <button
                        type="button"
                        onClick={startVoiceRecording}
                        className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl border border-red-500/20 transition-all pointer-events-auto"
                        title={lang === 'en' ? "Record audio message" : "অডিও ভয়েস বার্তা রেকর্ড"}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Text Input area */}
                      <input 
                        type="text"
                        value={chatInputText}
                        onChange={(e) => setChatInputText(e.target.value)}
                        placeholder={lang === 'en' ? "Type transparent memo/price..." : "বার্তাদি বা আলোচনার মূল্য লিখুন..."}
                        className="flex-1 bg-neutral-100 dark:bg-stone-900 text-neutral-800 dark:text-neutral-100 rounded-xl p-2.5 text-[11.5px] border border-neutral-200 dark:border-stone-850 outline-none focus:border-[#1A5319] pointer-events-auto font-sans"
                      />

                      {/* Send button */}
                      <button
                        type="submit"
                        disabled={!chatInputText.trim()}
                        className={`p-2.5 rounded-xl text-white transition-all pointer-events-auto ${
                          chatInputText.trim() 
                            ? 'bg-emerald-600 hover:bg-emerald-700 shadow-sm active:scale-95' 
                            : 'bg-neutral-300 dark:bg-stone-850 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </form>
                  )}
                </div>

                {/* Secure Trust Stamp */}
                <div className="flex justify-center items-center py-1 bg-emerald-500/5 mt-2 rounded border border-emerald-500/10">
                  <span className="text-[8.5px] font-mono text-[#1A5319] dark:text-[#4E9F3D] flex items-center uppercase tracking-wider">
                    <Shield className="w-3 h-3 mr-1" />
                    {lang === 'en' ? 'Biosecure Escrow Sandbox (AgroTrust)' : 'বায়োসিকিউর এসক্রো সুরক্ষিত'}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* CASHLESS MFS GATEWAY CHECKOUT HALF-SHEET DRAWER */}
        <AnimatePresence>
          {activeCheckoutListing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col justify-end"
            >
              <div className="flex-1" onClick={() => setActiveCheckoutListing(null)} />
              
              <motion.div
                initial={{ y: 400 }}
                animate={{ y: 0 }}
                exit={{ y: 400 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`rounded-t-[32px] p-5 shadow-2xl flex flex-col space-y-4 max-h-[90%] overflow-y-auto ${
                  theme === 'dark' ? 'bg-[#0E0E0E] text-[#E0E0E0] border-t border-stone-850' : 'bg-white text-[#212121] border-t border-emerald-100'
                }`}
              >
                {/* Header title */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-stone-800">
                  <div className="flex items-center space-x-1.5">
                    <Shield className="w-5 h-5 text-emerald-500 animate-pulse" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A5319] dark:text-[#4E9F3D]">
                      {t.checkoutHeader}
                    </h3>
                  </div>
                  <button 
                    id="btn-checkout-close"
                    onClick={() => setActiveCheckoutListing(null)}
                    className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-stone-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {checkoutStep === 'select' && (
                  <div className="space-y-4">
                    
                    {/* Consignment summary card detail */}
                    <div className="bg-emerald-50/50 dark:bg-stone-900/50 p-3 rounded-xl border border-emerald-500/10 flex items-center space-x-3 text-xs">
                      <img 
                        src={activeCheckoutListing.imageUrl} 
                        referrerPolicy="no-referrer"
                        alt={activeCheckoutListing.titleEn} 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-neutral-800 dark:text-neutral-100 truncate">
                          {lang === 'en' ? activeCheckoutListing.titleEn : activeCheckoutListing.titleBn}
                        </p>
                        <p className="text-[10px] text-[#1A5319] dark:text-[#4E9F3D] font-mono mt-0.5">
                          {t.verifiedSeller}: {lang === 'en' ? activeCheckoutListing.sellerEn : activeCheckoutListing.sellerBn}
                        </p>
                        <p className="text-[9px] text-neutral-400 mt-0.5">
                          📍 {lang === 'en' ? activeCheckoutListing.locationEn : activeCheckoutListing.locationBn}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-mono font-bold text-amber-500">
                          {lang === 'en' ? `${activeCheckoutListing.pricePerUnitEn}/${activeCheckoutListing.unitEn}` : `${activeCheckoutListing.pricePerUnitBn}/${activeCheckoutListing.unitBn}`}
                        </p>
                      </div>
                    </div>

                    {/* SELECT SECURE GATEWEAY PROVIDER */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">{t.selectWallet}</p>
                      
                      <div className="space-y-2 font-mono">
                        {/* bKash selector */}
                        <div 
                          id="btn-checkout-provider-bkash"
                          onClick={() => setSelectedMFS('bkash')}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedMFS === 'bkash'
                              ? 'border-pink-500 bg-pink-50/10 dark:bg-pink-950/10'
                              : 'border-emerald-500/10 bg-neutral-50 dark:bg-stone-900 hover:border-pink-500/30'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="w-6 h-6 rounded-md bg-pink-500 flex items-center justify-center text-white font-black text-xs font-sans">
                              b
                            </div>
                            <span className="text-xs font-bold">{t.bkashLabel}</span>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-pink-500 flex items-center justify-center p-0.5">
                            {selectedMFS === 'bkash' && <span className="w-full h-full rounded-full bg-pink-500" />}
                          </div>
                        </div>

                        {/* Nagad selector */}
                        <div 
                          id="btn-checkout-provider-nagad"
                          onClick={() => setSelectedMFS('nagad')}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedMFS === 'nagad'
                              ? 'border-orange-500 bg-orange-50/10 dark:bg-orange-950/10'
                              : 'border-emerald-500/10 bg-neutral-50 dark:bg-stone-900 hover:border-orange-500/30'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center text-white font-bold text-xs font-sans">
                              N
                            </div>
                            <span className="text-xs font-bold">{t.nagadLabel}</span>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center p-0.5">
                            {selectedMFS === 'nagad' && <span className="w-full h-full rounded-full bg-orange-500" />}
                          </div>
                        </div>

                        {/* Bank selector */}
                        <div 
                          id="btn-checkout-provider-bank"
                          onClick={() => setSelectedMFS('bank')}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedMFS === 'bank'
                              ? 'border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10'
                              : 'border-emerald-500/10 bg-neutral-50 dark:bg-stone-900 hover:border-indigo-500/30'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-xs">
                              <Building className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold">{t.bankLabel}</span>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center p-0.5">
                            {selectedMFS === 'bank' && <span className="w-full h-full rounded-full bg-indigo-600" />}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        id="btn-checkout-next"
                        onClick={() => setCheckoutStep('payment_form')}
                        className="w-full bg-[#1A5319] hover:bg-emerald-800 dark:bg-[#4E9F3D] dark:hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs tracking-wider transition-all flex items-center justify-center space-x-2"
                      >
                        <span>{lang === 'en' ? `Proceed with ${selectedMFS.toUpperCase()}` : `${selectedMFS.toUpperCase()} দিয়ে অগ্রসর হন`}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

                {checkoutStep === 'payment_form' && (
                  <form id="form-checkout-mfs" onSubmit={handleConfirmEscrowSubmit} className="space-y-4 font-mono text-xs">
                    
                    {/* Security credentials entry for bKash/Nagad */}
                    <div className="p-3 bg-neutral-50 dark:bg-stone-900 rounded-xl border border-emerald-500/10 space-y-3">
                      <div className="flex items-center space-x-2 pb-2 border-b border-neutral-150 dark:border-stone-800">
                        <Lock className="w-4 h-4 text-emerald-500" />
                        <span className="font-bold text-[10px] text-neutral-400 uppercase tracking-wider">
                          {selectedMFS.toUpperCase()} SECURE GATEWAY CHECKOUT
                        </span>
                      </div>

                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">{t.enterWalletPhone}</label>
                        <input 
                          id="input-mfs-phone"
                          type="text" 
                          required
                          value={mfsPhone}
                          onChange={(e) => setMfsPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-500/20 bg-stone-100 dark:bg-[#0A0A0A] outline-none focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-neutral-400 mb-1">{t.enterPin}</label>
                        <input 
                          id="input-mfs-pin"
                          type="password" 
                          required
                          maxLength={5}
                          value={mfsPin}
                          onChange={(e) => setMfsPin(e.target.value.replace(/\D/g, '').slice(0, 5))}
                          placeholder="••••"
                          className="w-full px-3 py-2 text-xs rounded-lg border border-emerald-500/20 bg-stone-100 dark:bg-[#0A0A0A] outline-none tracking-widest focus:ring-2 focus:ring-emerald-500/30"
                        />
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-2.5 rounded-xl flex items-start space-x-2 text-[10px] text-yellow-600 dark:text-yellow-400">
                      <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <p className="leading-snug">
                        {lang === 'en' ? 'AGROTRUST ESCROW GUARANTEE: Money stays in verified escrow state until the shipping vehicle is unloaded and verified at goal destination.' 
                                      : 'এগ্রোট্রাস্ট এসক্রো সুরক্ষানীতি: পণ্য ক্রান্তিসীমা পার হয়ে গন্তব্য পৌঁছানোর পূর্বে অর্থ এসক্রো হোল্ডে থাকবে।'}
                      </p>
                    </div>

                    <button
                      id="btn-escrow-submit"
                      type="submit"
                      disabled={paymentLoading}
                      className={`w-full text-white font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 ${
                        selectedMFS === 'bkash' ? 'bg-pink-600 hover:bg-pink-700' : selectedMFS === 'nagad' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-indigo-600 hover:bg-indigo-750'
                      }`}
                    >
                      {paymentLoading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>{t.escrowProcessing}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>{t.securePayment}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="space-y-4 text-xs font-mono">
                    
                    {/* SUCCESS ESCROW CONFIRMATION */}
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-1">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-[#1A5319] dark:text-[#4E9F3D] text-sm tracking-tight">{t.escrowHeld}</h4>
                      <p className="text-[10px] text-neutral-400">{t.trxSuccess}</p>
                      <div className="bg-black/40 py-1.5 px-3 rounded-lg w-max mx-auto border border-emerald-500/10 mt-1">
                        <span className="text-[11px] text-emerald-400 font-bold">TrxID: {trxId}</span>
                      </div>
                    </div>

                    {/* INTERACTIVE SHIPPMENT MAP TRACKER */}
                    <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-stone-900 border border-emerald-500/10 space-y-3">
                      <h4 className="text-[10.5px] font-bold text-[#1A5319] dark:text-[#4E9F3D] uppercase tracking-wider flex items-center">
                        <Map className="w-4 h-4 mr-1 text-emerald-500 animate-pulse" />
                        {t.mapTrackingHeader}
                      </h4>

                      {/* Map canvas track */}
                      <div className="h-16 relative bg-neutral-200 dark:bg-stone-950 border border-emerald-500/5 rounded-lg overflow-hidden flex items-center px-4">
                        <div className="absolute inset-0 bg-grid-slate-500 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
                        
                        {/* Map track route line */}
                        <div className="w-full h-1 bg-stone-300 dark:bg-stone-800 rounded relative">
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-300 relative"
                            style={{ width: `${transitPercent}%` }}
                          >
                            {/* Moving Truck Node */}
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] border border-emerald-400 shadow-md transform translate-x-3 transition-transform">
                              🚚
                            </div>
                          </div>
                        </div>

                        {/* Start Node */}
                        <div className="absolute left-3 top-2 flex flex-col items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="text-[7.5px] text-neutral-400 mt-0.5">Shibganj</span>
                        </div>

                        {/* Mid-Node */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-2 flex flex-col items-center">
                          <span className="w-2 h-2 rounded-full bg-stone-400" />
                          <span className="text-[7.5px] text-neutral-400 mt-0.5">Singair</span>
                        </div>

                        {/* End Node */}
                        <div className="absolute right-3 top-2 flex flex-col items-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                          <span className="text-[7.5px] text-neutral-400 mt-0.5">Hub</span>
                        </div>
                      </div>

                      {/* Moving parcel telemetry status readout */}
                      <div className="bg-stone-100 dark:bg-[#0A0A0A] p-2.5 rounded-lg border border-neutral-200/50 dark:border-neutral-900">
                        <p className="text-[10px] text-neutral-400">{t.deliveryVehicle}</p>
                        
                        <p className="font-bold text-neutral-800 dark:text-stone-200 text-xs mt-0.5">
                          {transitPercent === 0 ? 'Connecting vehicle...' : 
                           transitPercent === 100 ? (lang === 'bn' ? 'চালান গন্তব্যে পৌঁছেছে!' : 'Consignment safely arrived!') :
                           (lang === 'bn' ? `যাত্রাপথে রয়েছে (${convertNumber(transitPercent, lang)}%)` : `Vehicle in transit (${transitPercent}%)`)}
                        </p>
                        
                        <p className="text-[9px] text-[#212121]/50 dark:text-stone-400 leading-tight mt-1 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                          <span>{t.transitProgress}</span>
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-neutral-400">
                        <span>Escrow State:</span>
                        <span className={`font-bold px-1.5 py-0.5 rounded ${
                          escrowStatus === 'RELEASED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {escrowStatus}
                        </span>
                      </div>
                    </div>

                    <button
                      id="btn-delivery-minimize"
                      onClick={() => setActiveCheckoutListing(null)}
                      className="w-full bg-[#1A5319] hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>{t.closeDrawer}</span>
                    </button>

                  </div>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* DETAILED SAAO REGIONAL SUPPORT DIALOG BOX */}
        <AnimatePresence>
          {saaoSupportOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className={`w-full max-w-sm rounded-[24px] p-5 shadow-2xl relative space-y-3 font-mono text-xs ${
                  theme === 'dark' ? 'bg-[#121212] text-[#E0E0E0] border border-stone-800' : 'bg-white text-[#212121] border border-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-150 dark:border-stone-800">
                  <span className="text-[10px] font-bold text-[#1A5319] dark:text-[#4E9F3D] uppercase tracking-wider flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-emerald-500" />
                    DAE Encrypted Proof Portal
                  </span>
                  <button 
                    id="btn-saao-dialog-close"
                    onClick={() => setSaaoSupportOpen(false)}
                    className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-stone-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-start space-x-2.5 p-2 rounded-xl bg-emerald-500/5">
                  <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-neutral-400 leading-snug">
                    {lang === 'en' ? 'AgroTrust links directly with regional DAE Sub-Assistant Agriculture Officers. Transmitting proof files validates biological weight indices.' 
                                  : 'এগ্রোট্রাস্ট প্রযুক্তি সরাসরি আঞ্চলিক এসএএও কর্মকর্তার সাথে সংযুক্ত। ফসলের প্রমাণপত্র স্থানান্তর করা হলে তা জৈবিক ওজন সূচককে প্রত্যয়িত করে।'}
                  </p>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-xl space-y-1">
                  <p className="text-[10px] text-neutral-400">SAAO Designated Officer:</p>
                  <p className="font-bold text-xs text-neutral-800 dark:text-white">
                    {lang === 'en' ? MOCK_SAAO.nameEn : MOCK_SAAO.nameBn}
                  </p>
                  <p className="text-[9px] text-[#1A5319] dark:text-[#4E9F3D] font-bold">
                    GPS Sector: Shibganj, Bogura, BD.
                  </p>
                </div>

                <form id="form-saao-msg" onSubmit={handleSaaoSubmit} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[10px] text-neutral-400 mb-1">
                      {lang === 'en' ? 'Describe crop index anomalies or confirm verification' : 'ফসলের অসঙ্গতি বর্ণনা করুন বা সত্যতা নিশ্চিত করুন'}
                    </label>
                    <textarea 
                      id="input-saao-msg"
                      rows={2}
                      required
                      placeholder={lang === 'en' ? 'State moisture %, grade, or logistics help needed...' : 'আর্দ্রতার শতকরা হার, গ্রেড বা লজিস্টিক সহায়তার বিবরণ লিখুন...'}
                      value={saaoMessageText}
                      onChange={(e) => setSaaoMessageText(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-emerald-500/20 bg-stone-50 dark:bg-[#0A0A0A] outline-none focus:ring-2 focus:ring-emerald-500/30"
                    />
                  </div>

                  {saaoStatusText && (
                    <p className="text-[9.5px] text-yellow-500 animate-pulse font-bold flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1 animate-pulse" />
                      {saaoStatusText}
                    </p>
                  )}

                  <div className="flex gap-2 justify-end pt-1">
                    <button
                      id="btn-saao-cancel"
                      type="button"
                      onClick={() => setSaaoSupportOpen(false)}
                      className="px-3 py-2 text-[10px] font-bold text-neutral-400 border border-transparent hover:border-neutral-200 dark:hover:border-stone-800 rounded-lg"
                    >
                      {lang === 'en' ? 'Cancel' : 'বাতিল'}
                    </button>
                    
                    <button
                      id="btn-saao-send"
                      type="submit"
                      className="bg-[#1A5319] dark:bg-[#4E9F3D] text-white px-3.5 py-2.5 rounded-lg active:scale-95 text-[10px] font-bold"
                    >
                      {lang === 'en' ? 'Transmit Verification Proof' : 'ভেরিফিকেশন প্রমাণ পাঠান'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE ESCROW DRAWER CONTROLLER OVERLAYS */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="absolute inset-0 z-50 flex text-left">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute inset-0 bg-black cursor-pointer"
              />
              {/* Drawer Content */}
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className={`w-4/5 max-w-[280px] h-full shadow-2xl z-10 flex flex-col p-5 relative transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-[#121212] text-white border-r border-white/10' : 'bg-white text-slate-800 border-r border-[#1A5319]/15'
                }`}
              >
                {/* Close Button Header */}
                <div className="flex items-center justify-between border-b pb-3 mb-4 border-neutral-200 dark:border-white/10 pt-4">
                  <div className="flex items-center space-x-1.5">
                    <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400 rotate-90" />
                    <h3 className="text-xs font-bold uppercase tracking-wide">
                      {lang === 'en' ? 'Product Categories' : 'ফসলের ক্যাটাগরি'}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto scrollbar-none space-y-4 pr-1">
                  {/* All category shortcut */}
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setCurrentReelIndex(0);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      activeCategory === 'all'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'hover:bg-emerald-500/10 dark:hover:bg-white/5 bg-neutral-100 dark:bg-stone-900 text-slate-700 dark:text-neutral-300 pointer-events-auto'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'All Products' : 'সব পণ্য সমগ্র'}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-80">{listings.length}</span>
                  </button>

                  {/* Map through CATEGORIES_STRUCTURE */}
                  <div className="space-y-3">
                    {CATEGORIES_STRUCTURE.map((parent) => {
                      const isParentActive = activeCategory === parent.id;
                      const parentCount = listings.filter(item => {
                        return item.category === parent.id || parent.subcategories.some(sub => sub.id === item.category);
                      }).length;

                      return (
                        <div key={parent.id} className="space-y-1.5 border-b border-neutral-100 dark:border-neutral-900/50 pb-2">
                          <button
                            onClick={() => {
                              setActiveCategory(parent.id);
                              setCurrentReelIndex(0);
                              setMobileSidebarOpen(false);
                            }}
                            className={`w-full py-1.5 px-2 rounded-md text-xs font-bold transition-all flex items-center justify-between text-left cursor-pointer ${
                              isParentActive
                                ? 'bg-emerald-600/20 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20 shadow-sm'
                                : 'text-slate-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-950 pointer-events-auto'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(parent.id)}
                              <span>{lang === 'en' ? parent.nameEn : parent.nameBn}</span>
                            </div>
                            <span className="text-[9px] font-mono bg-neutral-100 dark:bg-neutral-900/80 px-1.5 rounded-full">
                              {parentCount}
                            </span>
                          </button>

                          <div className="pl-4 space-y-1">
                            {parent.subcategories.map((sub) => {
                              const isSubActive = activeCategory === sub.id;
                              const subCount = listings.filter(item => item.category === sub.id).length;

                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => {
                                    setActiveCategory(sub.id);
                                    setCurrentReelIndex(0);
                                    setMobileSidebarOpen(false);
                                  }}
                                  className={`w-full py-1 px-2 rounded text-[11px] font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                                    isSubActive
                                      ? 'text-emerald-700 dark:text-[#4E9F3D] font-bold bg-emerald-50/50 dark:bg-[#1A5319]/10'
                                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                                  }`}
                                >
                                  <span className="flex items-center">
                                    <span className={`w-1 h-1 rounded-full mr-1.5 ${isSubActive ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                                    {lang === 'en' ? sub.nameEn : sub.nameBn}
                                  </span>
                                  <span className="text-[8px] font-mono opacity-60">
                                    {subCount}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Telemetry info at bottom of mobile drawer */}
                <div className="border-t pt-3 border-neutral-200 dark:border-white/10 text-[8px] font-mono mt-auto text-center text-neutral-400">
                  🔒 INTEGRITY PROTOCOLS ONLINE
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>


        {/* SYSTEMIC BOTTOM FOOTER NAVIGATION RAIL (Parity with premium device mockups) */}
        {activeScreen !== 'onboarding' && (
          <div className={`mt-auto px-4 py-2 flex items-center justify-around border-t z-45 transition-all duration-300 backdrop-blur-md ${
            theme === 'dark' ? 'bg-black/15 border-white/10' : 'bg-white/20 border-[#1A5319]/10'
          }`}>
            
            {/* Buyer/Seller Pivot Toggles in Footer */}
            <button 
              id="btn-nav-buyer-feed"
              onClick={() => {
                setActiveScreen('dashboard');
                setPortal('buyer');
                showToast(lang === 'bn' ? 'ক্রয় এসক্রো সিস্টেম লোড হচ্ছে...' : 'Loading buyer escrow terminal...');
              }}
              className={`flex flex-col items-center p-2.5 rounded-2xl relative transition-all ${
                activeScreen === 'dashboard' && portal === 'buyer'
                  ? 'text-[#1A5319] dark:text-[#4E9F3D]'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Layers className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold font-sans tracking-tight">{t.buyerTerminal}</span>
              {activeScreen === 'dashboard' && portal === 'buyer' && (
                <span className="absolute bottom-0 w-5 h-0.5 bg-[#1A5319] dark:bg-[#4E9F3D] rounded" />
              )}
            </button>

            <button 
              id="btn-nav-seller-center"
              onClick={() => {
                setActiveScreen('dashboard');
                setPortal('seller');
                showToast(lang === 'bn' ? 'বিক্রেতা পোর্টাল ও ডিএই সেন্টার' : 'Opening Seller Portal & DAE dispatch...');
              }}
              className={`flex flex-col items-center p-2.5 rounded-2xl relative transition-all ${
                activeScreen === 'dashboard' && portal === 'seller'
                  ? 'text-[#1A5319] dark:text-[#4E9F3D]'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <TrendingUp className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold font-sans tracking-tight">{t.sellerTerminal}</span>
              {activeScreen === 'dashboard' && portal === 'seller' && (
                <span className="absolute bottom-0 w-5 h-0.5 bg-[#1A5319] dark:bg-[#4E9F3D] rounded animate-pulse" />
              )}
            </button>

            <button 
              id="btn-nav-settings"
              onClick={() => {
                setActiveScreen('settings');
                showToast(lang === 'bn' ? 'কনফিগারেশন টার্মিনাল সেটআপ...' : 'Opening system configuration terminal...');
              }}
              className={`flex flex-col items-center p-2.5 rounded-2xl relative transition-all ${
                activeScreen === 'settings'
                  ? 'text-[#1A5319] dark:text-[#4E9F3D]'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Settings className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold font-sans tracking-tight">{lang === 'en' ? 'Settings' : 'কনফিগার'}</span>
              {activeScreen === 'settings' && (
                <span className="absolute bottom-0 w-5 h-0.5 bg-[#1A5319] dark:bg-[#4E9F3D] rounded animate-pulse" />
              )}
            </button>

          </div>
        )}

      </div>
    </div>
  </div>
  );
}

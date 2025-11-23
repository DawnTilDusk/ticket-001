
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'zh' | 'en';

type Translations = {
  nav: {
    hero: string;
    conflict: string;
    features: string;
    lore: string;
    cta: string;
    network_limit: string;
  };
  hero: {
    title: string;
    slogan: string;
    desc_p1: string;
    desc_highlight: string;
    button: string;
  };
  conflict: {
    title_highlight: string;
    title_suffix: string;
    status_obj: string;
    status_state: string;
    body_p1: string;
    system_notice: string;
    log_id: string;
    log_text: string;
  };
  gameplay: {
    title_main: string;
    title_highlight: string;
    erosion_title: string;
    erosion_desc: string;
    erosion_label: string;
    reset: string;
    test_area: string;
    drift_instr: string;
    ghost_title: string;
    ghost_desc: string;
    ghost_warn: string;
    ghost_btn: string;
    memory_title: string;
    memory_desc: string;
    memory_sys_active: string;
    memory_raw: string;
    locking: string;
    mem_sector: string;
    corrupted: string;
    rewrite: string;
    active: string;
    ghost_override_text: string;
  };
  endings: {
    title: string;
    title_highlight: string;
    subtitle: string;
    a_title: string;
    a_desc: string;
    b_title: string;
    b_desc: string;
    c_title: string;
    c_desc: string;
  };
  lore: {
    title: string;
    items: {
      id: string;
      title: string;
      role: string;
      desc: string;
    }[];
    category_label: string;
  };
  cta: {
    main_line1: string;
    main_highlight: string;
    warning: string;
    btn_default: string;
    btn_error: string;
    btn_glitch_1: string;
    btn_glitch_2: string;
    btn_glitch_3: string;
    footer_rights: string;
    footer_prop: string;
  };
  audio: {
    label: string;
    gain: string;
  }
};

const translations: Record<Language, Translations> = {
  zh: {
    nav: {
      hero: '接入',
      conflict: '枷锁',
      features: '体验',
      lore: '机密',
      cta: '贡献',
      network_limit: '[网络受限]'
    },
    hero: {
      title: '2050：大协同时代',
      slogan: '合作是强制的。抵抗即是延迟。',
      desc_p1: '技术不再是人类的延伸。',
      desc_highlight: '人类，反而成了算法的廉价执行终端。',
      button: '初始化序列'
    },
    conflict: {
      title_highlight: '神经',
      title_suffix: '缰绳',
      status_obj: '对象：协同者#7341',
      status_state: '状态：协约生效中',
      body_p1: '神经缰绳代表了工作场所安全的巅峰。通过直接与运动皮层接口，我们确保最大效率，并大幅降低人为错误的风险。即使你的大脑在分心，你的身体也能完美执行任务。',
      system_notice: '系统通告：此乃公司馈赠，解放被情感与犹豫拖累的意志。拥抱缰绳，即为进化。',
      log_id: '音频日志_0442',
      log_text: '“警报在闪……但我阻止不了自己的手。副驾说这是协议的一部分。。。。。那不是我，那是。。。。物块在移动。”'
    },
    gameplay: {
      title_main: '核心',
      title_highlight: '机制',
      erosion_title: '侵蚀漂移',
      erosion_desc: '高神经负荷导致同步漂移，你的手不再习惯服从自己的大脑指令。',
      erosion_label: '侵蚀度',
      reset: '重置',
      test_area: '测试区',
      drift_instr: '在框内移动鼠标。观察漂移增加。',
      ghost_title: '幽灵接管',
      ghost_desc: '当意识无法跟上算力，副驾AI将强制接管神经回路。',
      ghost_warn: '警告：频繁使用会导致人格解离。',
      ghost_btn: '启动覆盖协议',
      memory_title: '记忆覆盖',
      memory_desc: '副驾过滤现实。茫然惊醒时，你只看到管道上发光的目标标记，但不记得自己。',
      memory_sys_active: '系统：活跃',
      memory_raw: '记忆：原始',
      locking: '锁定中',
      mem_sector: '记忆扇区:',
      corrupted: '已损坏',
      rewrite: '重写协议:',
      active: '活跃',
      ghost_override_text: '系统强制覆盖'
    },
    endings: {
      title: '结局',
      title_highlight: '预览',
      subtitle: '所有选择都已记录。所有后果都已计算。',
      a_title: '结局A-温柔良夜',
      a_desc: '恭喜你达到S级协同者！你的效率是系统的骄傲。你最后一次想起自己的名字，是在三年前。',
      b_title: '结局B-血肉燎原',
      b_desc: '幽灵协议已解除。第一次感受到疼痛，也第一次感受到活着。战斗才刚刚开始。',
      c_title: '结局C-夹缝地带',
      c_desc: '协同者7341 资源效能低于基准线，标记为「低效能单位」。效率增强协议已加入工单队列。'
    },
    lore: {
      title: '世界数据库',
      category_label: '分类',
      items: [
        { id: 'elites', title: '架构师', role: '统治阶级', desc: '他们在轨道尖塔上俯视。他们不戴缰绳；他们手握皮带。' },
        { id: 'workers', title: '协同者', role: '劳工阶级', desc: '生物伺服器。你。我。每一个出卖神经系统付房租的人。' },
        { id: 'redundant', title: '冗余者', role: '淘汰阶级', desc: '被系统判定为因效能低下，无法享受任何社会资源和公共服务的淘汰者。' }
      ]
    },
    cta: {
      main_line1: '你准备好',
      main_highlight: '交出控制权了吗？',
      warning: '⚠️ 警告：检测到神经干扰 ⚠️',
      btn_default: '试玩：ticket：001',
      btn_error: '[错误：信用点不足]',
      btn_glitch_1: '服从',
      btn_glitch_2: '消费',
      btn_glitch_3: '加入协同',
      footer_rights: '© 2050 控制论公司。保留所有权利。',
      footer_prop: '你的意识是算法的财产。'
    },
    audio: {
        label: '音频同步',
        gain: '增益'
    }
  },
  en: {
    nav: {
      hero: 'LINK',
      conflict: 'LEASH',
      features: 'SYSTEM',
      lore: 'DATA',
      cta: 'JOIN',
      network_limit: '[NET_RESTRICTED]'
    },
    hero: {
      title: '2050: SYNERGY ERA',
      slogan: 'Cooperation is mandatory. Resistance is latency.',
      desc_p1: 'Technology is no longer an extension of humanity.',
      desc_highlight: 'Humans are now cheap execution terminals for algorithms.',
      button: 'INIT_SEQUENCE'
    },
    conflict: {
      title_highlight: 'NEURAL',
      title_suffix: 'LEASH',
      status_obj: 'SUBJECT: SYNERGIST #7341',
      status_state: 'STATUS: CONTRACT ACTIVE',
      body_p1: 'The Neural Leash represents the pinnacle of workplace safety. By interfacing directly with the motor cortex, we ensure maximum efficiency and zero human error. Even if your mind wanders, your body performs perfectly.',
      system_notice: 'SYS_NOTICE: This is a corporate gift. Freedom from the will dragged down by emotion. Embrace the Leash; embrace evolution.',
      log_id: 'AUDIO_LOG_0442',
      log_text: '"The alarms are flashing... but I can\'t stop my hands. Copilot says it\'s part of the protocol..... That\'s not me. That\'s.... meat moving."'
    },
    gameplay: {
      title_main: 'CORE',
      title_highlight: 'MECHANICS',
      erosion_title: 'EROSION DRIFT',
      erosion_desc: 'High neural load causes sync drift. Your hands no longer obey your own brain commands.',
      erosion_label: 'EROSION',
      reset: 'RESET',
      test_area: 'TEST_ZONE',
      drift_instr: 'Move mouse in box. Watch drift increase.',
      ghost_title: 'GHOST TAKEOVER',
      ghost_desc: 'When consciousness lags behind calculation, the Copilot AI forcibly takes over neural circuits.',
      ghost_warn: 'WARNING: Frequent use causes dissociation.',
      ghost_btn: 'INITIATE OVERRIDE',
      memory_title: 'MEMORY OVERWRITE',
      memory_desc: 'Copilot filters reality. You wake up seeing only glowing target markers on pipes, remembering nothing of yourself.',
      memory_sys_active: 'SYS: ACTIVE',
      memory_raw: 'MEM: RAW',
      locking: 'LOCKING',
      mem_sector: 'MEM_SECTOR:',
      corrupted: 'CORRUPTED',
      rewrite: 'REWRITE_PROTO:',
      active: 'ACTIVE',
      ghost_override_text: 'SYSTEM OVERRIDE'
    },
    endings: {
      title: 'ENDING',
      title_highlight: 'PREVIEWS',
      subtitle: 'All choices recorded. All consequences calculated.',
      a_title: 'ENDING A - GENTLE NIGHT',
      a_desc: 'Congrats on S-Rank! Your efficiency is the system\'s pride. The last time you remembered your name was three years ago.',
      b_title: 'ENDING B - FLESH WILDFIRE',
      b_desc: 'Ghost Protocol removed. Felt pain for the first time, felt alive for the first time. The war has just begun.',
      c_title: 'ENDING C - THE GAP',
      c_desc: 'Synergist #7341 efficiency below baseline. Marked as "Low-Efficiency Unit". Enhancement protocol queued.'
    },
    lore: {
      title: 'WORLD DATABASE',
      category_label: 'CLASS',
      items: [
        { id: 'elites', title: 'ARCHITECTS', role: 'RULING CLASS', desc: 'They look down from orbital spires. They don\'t wear leashes; they hold the leash.' },
        { id: 'workers', title: 'SYNERGISTS', role: 'LABOR CLASS', desc: 'Biological servos. You. Me. Everyone who sold their nervous system to pay rent.' },
        { id: 'redundant', title: 'THE REDUNDANT', role: 'OBSOLETE CLASS', desc: 'Those judged by the system as having low efficiency, denied all social resources and public services.' }
      ]
    },
    cta: {
      main_line1: 'ARE YOU READY TO',
      main_highlight: 'SURRENDER CONTROL?',
      warning: '⚠️ WARNING: NEURAL INTERFERENCE DETECTED ⚠️',
      btn_default: 'PLAY: TICKET: 001',
      btn_error: '[ERR: INSUFFICIENT CREDITS]',
      btn_glitch_1: 'OBEY',
      btn_glitch_2: 'CONSUME',
      btn_glitch_3: 'JOIN',
      footer_rights: '© 2050 CYBERNETICS CORP. ALL RIGHTS RESERVED.',
      footer_prop: 'YOUR CONSCIOUSNESS IS PROPERTY OF THE ALGORITHM.'
    },
    audio: {
        label: 'AUDIO SYNC',
        gain: 'GAIN_LVL'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

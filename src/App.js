import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import CharacterSelector from './CharacterSelector';
import ProfileCard from './ProfileCard';
import './App.css';

// キャラクターデータを追加
const characters = [
  { id: "001", name: "Kasumi", image: "001_kasumi.png" },
  { id: "002", name: "Zack", image: "002_zack.png" },
  { id: "003", name: "Tina", image: "003_tina.png" },
  { id: "004", name: "Helena", image: "004_helena.png" },
  { id: "005", name: "Bass", image: "005_bass.png" },
  { id: "006", name: "Mila", image: "006_mila.png" },
  { id: "007", name: "Ayane", image: "007_ayane.png" },
  { id: "008", name: "Diego", image: "008_diego.png" },
  { id: "009", name: "Bayman", image: "009_bayman.png" },
  { id: "010", name: "Jann Lee", image: "010_jann-lee.png" },
  { id: "011", name: "Leifang", image: "011_leifang.png" },
  { id: "012", name: "Hitomi", image: "012_hitomi.png" },
  { id: "013", name: "Rig", image: "013_rig.png" },
  { id: "014", name: "Christie", image: "014_christie.png" },
  { id: "015", name: "Hayabusa", image: "015_hayabusa.png" },
  { id: "016", name: "Hayate", image: "016_hayate.png" },
  { id: "017", name: "Marie Rose", image: "017_marie-rose.png" },
  { id: "018", name: "Honoka", image: "018_honoka.png" },
  { id: "019", name: "Nico", image: "019_nico.png" },
  { id: "020", name: "Kokoro", image: "020_kokoro.png" },
  { id: "021", name: "La Mariposa", image: "021_lamariposa.png" },
  { id: "022", name: "Brad", image: "022_brad.png" },
  { id: "023", name: "Eliot", image: "023_eliot.png" },
  { id: "024", name: "Raidou", image: "024_raidou.png" },
  { id: "025", name: "Nyotengu", image: "025_nyotengu.png" },
  { id: "026", name: "Phase 4", image: "026_phase4.png" },
  { id: "027", name: "Mai", image: "027_mai.png" },
  { id: "028", name: "Kula", image: "028_kula.png" },
  { id: "029", name: "Momiji", image: "029_momiji.png" },
  { id: "030", name: "Rachel", image: "030_rachel.png" },
  { id: "031", name: "Tamaki", image: "031_tamaki.png" }
];

function App() {
  const [formData, setFormData] = useState({
    playerName: '',
    playerId: '',
    freeText: '',
    fightingGameHistory: '',
    doaSeriesHistory: '',
    rank: 'F-',
    maxRank: 'F-',
    vc: [],
    platform: [],
    selectedCharacters: [],
    mainCharacter: null,
    subCharacters: []
  });

  const [selectionMode, setSelectionMode] = useState('main'); // 'main', 'sub1', 'sub2', 'done'

  const ranks = [
    '-',
    'F-', 'F', 'F+',
    'E-', 'E', 'E+',
    'D-', 'D', 'D+',
    'C-', 'C', 'C+',
    'B-', 'B', 'B+',
    'A-', 'A', 'A+',
    'S-', 'S', 'S+',
    'U-', 'U', 'U+',
    '★', '★★', '★★★',
    '★★★★', '★★★★★',
  ];

  // キャラクター名を取得する関数を追加
  const getCharacterNameById = (id) => {
    if (!id) return '未選択';
    const character = characters.find(char => char.id === id);
    return character ? character.name : '未選択';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
    const array = prev[name];
    if (array.includes(value)) {
    return { ...prev, [name]: array.filter(v => v !== value) };
    } else {
    return { ...prev, [name]: [...array, value] };
    }
    });
  };

  const handleCharacterSelect = (id) => {
    if (selectionMode === 'main') {
    setFormData(prev => ({ ...prev, mainCharacter: id }));
    setSelectionMode('sub1');
    } else if (selectionMode === 'sub1') {
    setFormData(prev => ({ ...prev, subCharacters: [id] }));
    setSelectionMode('sub2');
    } else if (selectionMode === 'sub2') {
    setFormData(prev => ({ 
    ...prev, 
    subCharacters: [...prev.subCharacters, id],
    selectedCharacters: [prev.mainCharacter, ...prev.subCharacters, id].filter(Boolean)
    }));
    setSelectionMode('done');
    }
  };

  const resetCharacterSelection = () => {
    setFormData(prev => ({
    ...prev,
    mainCharacter: null,
    subCharacters: [],
    selectedCharacters: []
    }));
    setSelectionMode('main');
  };

  const saveAsImage = () => {
    html2canvas(document.querySelector("#profileCard")).then(canvas => {
    const link = document.createElement('a');
    link.download = 'doa6-profile-card.png';
    link.href = canvas.toDataURL();
    link.click();
    });
  };

  const getSelectionModeText = () => {
    switch(selectionMode) {
    case 'main': return 'メインキャラクターを選択してください';
    case 'sub1': return 'サブキャラクター1を選択してください';
    case 'sub2': return 'サブキャラクター2を選択してください';
    case 'done': return 'キャラクター選択完了';
    default: return '';
    }
  };

  return (
    <div className="container">
    <h1>DEAD OR ALIVE 6 自己紹介カード作成アプリ</h1>

    <div className="form">
    <div className="form-group">
    <label>プレイヤーネーム:</label>
    <input 
    type="text" 
    name="playerName" 
    placeholder="プレイヤーネーム" 
    value={formData.playerName} 
    onChange={handleInputChange} 
    />
    </div>

    <div className="form-group">
    <label>ID:</label>
    <input 
    type="text" 
    name="playerId" 
    placeholder="ID" 
    value={formData.playerId} 
    onChange={handleInputChange} 
    />
    </div>

    <div className="form-group">
    <label>格闘ゲーム歴:</label>
    <input 
    type="text" 
    name="fightingGameHistory" 
    placeholder="例: 10年" 
    value={formData.fightingGameHistory} 
    onChange={handleInputChange} 
    />
    </div>

    <div className="form-group">
    <label>DOAシリーズ歴:</label>
    <input 
    type="text" 
    name="doaSeriesHistory" 
    placeholder="例: 5年" 
    value={formData.doaSeriesHistory} 
    onChange={handleInputChange} 
    />
    </div>

    <div className="form-group">
    <label>現在のランク:</label>
    <select name="rank" value={formData.rank} onChange={handleInputChange}>
    {ranks.map(rank => (
    <option key={rank} value={rank}>{rank}</option>
    ))}
    </select>
    </div>

    <div className="form-group">
    <label>最高ランク:</label>
    <select name="maxRank" value={formData.maxRank} onChange={handleInputChange}>
    {ranks.map(rank => (
    <option key={rank} value={rank}>{rank}</option>
    ))}
    </select>
    </div>

    <div className="form-group">
    <label>VC:</label>
    <div className="checkbox-group">
    {['Discord', 'Skype', 'PSVC', 'None'].map(vc => (
    <label key={vc} className="checkbox-label">
    <input 
    type="checkbox" 
    name="vc" 
    value={vc} 
    onChange={handleCheckboxChange} 
    />
    {vc}
    </label>
    ))}
    </div>
    </div>

    <div className="form-group">
    <label>プラットフォーム:</label>
    <div className="checkbox-group">
    {['PlayStation', 'Steam', 'Xbox'].map(platform => (
    <label key={platform} className="checkbox-label">
    <input 
    type="checkbox" 
    name="platform" 
    value={platform} 
    onChange={handleCheckboxChange} 
    />
    {platform}
    </label>
    ))}
    </div>
    </div>

    <div className="form-group">
    <label>フリースペース:</label>
    <textarea 
    name="freeText" 
    placeholder="自由にメッセージを入力してください" 
    value={formData.freeText} 
    onChange={handleInputChange} 
    rows="3"
    />
    </div>
    </div>

    <div className="character-selection-section">
    <h3>キャラクター選択</h3>
    <p className="selection-mode-text">{getSelectionModeText()}</p>
    
    <div className="character-selection-status">
    <div>メイン: {getCharacterNameById(formData.mainCharacter)}</div>
    <div>サブ1: {getCharacterNameById(formData.subCharacters[0])}</div>
    <div>サブ2: {getCharacterNameById(formData.subCharacters[1])}</div>
    </div>

    <button onClick={resetCharacterSelection} className="reset-button">
    キャラクター選択をリセット
    </button>
    </div>

    <CharacterSelector 
    selectedCharacters={formData.selectedCharacters}
    mainCharacter={formData.mainCharacter}
    subCharacters={formData.subCharacters}
    onCharacterSelect={handleCharacterSelect}
    selectionMode={selectionMode}
    />

    <div className="action-buttons">
    <button onClick={saveAsImage} className="save-button">
    画像として保存
    </button>
    </div>

    <ProfileCard formData={formData} />
    </div>
  );
}

export default App;
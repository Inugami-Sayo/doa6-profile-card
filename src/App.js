import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import CharacterSelector from './CharacterSelector';
import ProfileCard from './ProfileCard';
import './App.css';

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
          <div>メイン: {formData.mainCharacter || '未選択'}</div>
          <div>サブ1: {formData.subCharacters[0] || '未選択'}</div>
          <div>サブ2: {formData.subCharacters[1] || '未選択'}</div>
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
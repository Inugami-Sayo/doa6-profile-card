import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import CharacterSelector from './CharacterSelector';
import ProfileCard from './ProfileCard';

function App() {
  const [formData, setFormData] = useState({
    playerName: '',
    playerId: '',
    freeText: '',
    rank: 'A',
    maxRank: 'A',
    vc: [],
    platform: [],
    selectedCharacters: [],
  });

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
    setFormData(prev => {
      const selected = prev.selectedCharacters.includes(id)
        ? prev.selectedCharacters.filter(c => c !== id)
        : [...prev.selectedCharacters, id];
      return { ...prev, selectedCharacters: selected };
    });
  };

  const saveAsImage = () => {
    html2canvas(document.querySelector("#profileCard")).then(canvas => {
      const link = document.createElement('a');
      link.download = 'profile-card.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="container">
      <h1>DEAD OR ALIVE 6 自己紹介カード作成アプリ</h1>

      <div className="form">
        <input type="text" name="playerName" placeholder="プレイヤーネーム" value={formData.playerName} onChange={handleInputChange} />
        <input type="text" name="playerId" placeholder="ID" value={formData.playerId} onChange={handleInputChange} />
        <textarea name="freeText" placeholder="フリースペース" value={formData.freeText} onChange={handleInputChange} />

        <select name="rank" value={formData.rank} onChange={handleInputChange}>
          <option>A</option><option>B</option><option>C</option><option>D</option>
        </select>

        <select name="maxRank" value={formData.maxRank} onChange={handleInputChange}>
          <option>A</option><option>B</option><option>C</option><option>D</option>
        </select>

        <div>
          <label>VC:</label>
          {['Discord', 'Skype', 'None'].map(vc => (
            <label key={vc}>
              <input type="checkbox" name="vc" value={vc} onChange={handleCheckboxChange} />
              {vc}
            </label>
          ))}
        </div>

        <div>
          <label>プラットフォーム:</label>
          {['Playstation', 'Steam', 'Xbox'].map(platform => (
            <label key={platform}>
              <input type="checkbox" name="platform" value={platform} onChange={handleCheckboxChange} />
              {platform}
            </label>
          ))}
        </div>
      </div>

      <CharacterSelector selectedCharacters={formData.selectedCharacters} onCharacterSelect={handleCharacterSelect} />

      <button onClick={saveAsImage}>画像として保存</button>

      <ProfileCard formData={formData} />
    </div>
  );
}

export default App;
import React from 'react';

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

function CharacterSelector({ selectedCharacters, mainCharacter, subCharacters, onCharacterSelect, selectionMode }) {
    const getCharacterClass = (charId) => {
        if (selectionMode === 'done') {
            if (charId === mainCharacter) return 'character-main';
            if (subCharacters.includes(charId)) return 'character-sub';
            return 'character-unselected';
        }
        
        if (selectedCharacters.includes(charId)) {
            return 'character-selected';
        }
        
        return 'character-available';
    };

    const isCharacterClickable = (charId) => {
        return selectionMode !== 'done' && !selectedCharacters.includes(charId);
    };

    return (
        <div className="character-selector">
            <div className="character-grid">
                {characters.map((char) => (
                    <div key={char.id} className="character-item">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/${char.image}`}
                            alt={char.name}
                            onClick={() => isCharacterClickable(char.id) && onCharacterSelect(char.id)}
                            className={`character-image ${getCharacterClass(char.id)} ${
                                isCharacterClickable(char.id) ? 'clickable' : ''
                            }`}
                        />
                        <div className="character-name">{char.name}</div>
                        {char.id === mainCharacter && (
                            <div className="character-role-badge main">メイン</div>
                        )}
                        {subCharacters.includes(char.id) && (
                            <div className="character-role-badge sub">
                                サブ{subCharacters.indexOf(char.id) + 1}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharacterSelector;
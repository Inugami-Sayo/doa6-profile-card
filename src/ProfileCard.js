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

function ProfileCard({ formData }) {
    const getCharacterById = (id) => {
        return characters.find(char => char.id === id);
    };

    const mainChar = formData.mainCharacter ? getCharacterById(formData.mainCharacter) : null;
    const subChar1 = formData.subCharacters[0] ? getCharacterById(formData.subCharacters[0]) : null;
    const subChar2 = formData.subCharacters[1] ? getCharacterById(formData.subCharacters[1]) : null;
    
    const hasSubCharacters = subChar1 || subChar2;

    return (
        <div id="profileCard" className="profile-card">
            <div className="card-title">DEAD OR ALIVE 6 Profile Card</div>
            <div className="profile-header">
                <h2 className="player-name">{formData.playerName || 'プレイヤーネーム'}</h2>
                <div className="player-ids">
                    {(() => {
                        const ids = [];
                        if (formData.steamId) ids.push(`Steam ID: ${formData.steamId}`);
                        if (formData.psId) ids.push(`PS ID: ${formData.psId}`);
                        if (formData.xboxId) ids.push(`Xbox ID: ${formData.xboxId}`);
                        if (formData.xId) ids.push(`X ID: ${formData.xId}`);
                        if (ids.length > 0) {
                            return <div className="id-row">{ids.join(' / ')}</div>;
                        } else {
                            return <div className="id-row">ID未入力</div>;
                        }
                    })()}
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-left">
                    <div className="character-display">
                        {mainChar && (
                            <div className="main-character">
                                <img 
                                    src={`${process.env.PUBLIC_URL}/images/${mainChar.image}`}
                                    alt={mainChar.name}
                                    className={`main-character-image ${hasSubCharacters ? 'with-subs' : 'solo'}`}
                                />
                                <div className="main-character-name">{mainChar.name}</div>
                            </div>
                        )}
                        
                        {hasSubCharacters && (
                            <div className="sub-characters">
                                {subChar1 && (
                                    <div className="sub-character">
                                        <img 
                                            src={`${process.env.PUBLIC_URL}/images/${subChar1.image}`}
                                            alt={subChar1.name}
                                            className="sub-character-image"
                                        />
                                        <div className="sub-character-name">{subChar1.name}</div>
                                    </div>
                                )}
                                {subChar2 && (
                                    <div className="sub-character">
                                        <img 
                                            src={`${process.env.PUBLIC_URL}/images/${subChar2.image}`}
                                            alt={subChar2.name}
                                            className="sub-character-image"
                                        />
                                        <div className="sub-character-name">{subChar2.name}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="profile-right">
                    <div className="profile-info">
                        <div className="info-row">
                            <span className="info-label">現在のランク:</span>
                            <span className="info-value">{formData.rank}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">最高ランク:</span>
                            <span className="info-value">{formData.maxRank}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">格闘ゲーム歴:</span>
                            <span className="info-value">{formData.fightingGameHistory || '未入力'}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">DOAシリーズ歴:</span>
                            <span className="info-value">{formData.doaSeriesHistory || '未入力'}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">VC:</span>
                            <span className="info-value">{formData.vc.length > 0 ? formData.vc.join(', ') : 'なし'}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">プラットフォーム:</span>
                            <span className="info-value">{formData.platform.length > 0 ? formData.platform.join(', ') : 'なし'}</span>
                        </div>
                    </div>

                    {formData.freeText && (
                        <div className="free-text">
                            <div className="free-text-label">メッセージ:</div>
                            <div className="free-text-content">{formData.freeText}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
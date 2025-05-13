import React from 'react';

function ProfileCard({ formData }) {
    return (
    <div id="profileCard" className="profile-card">
        <h2>{formData.playerName}</h2>
        <p>ID: {formData.playerId}</p>
        <p>ランク: {formData.rank} / 最高ランク: {formData.maxRank}</p>
        <p>VC: {formData.vc.join(', ')}</p>
        <p>プラットフォーム: {formData.platform.join(', ')}</p>
        <p>{formData.freeText}</p>
        <div className="selected-characters">
        {formData.selectedCharacters.map(id => (
            <span key={id}>キャラID:{id} </span>
        ))}
        </div>
    </div>
    );
}

export default ProfileCard;

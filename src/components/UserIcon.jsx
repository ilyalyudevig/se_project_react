const UserIcon = ({ block, avatar, name }) => {
  return (
    <div className={`${block}__user-icon-container`}>
      {avatar ? (
        <img
          className={`${block}__user-icon`}
          src={avatar}
          alt={`${name}'s profile picture`}
        />
      ) : (
        <p>{name[0]}</p>
      )}
    </div>
  );
};

export default UserIcon;

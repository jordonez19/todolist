const ListHeader = ({ listName }) => {

    const signOut = async () => {
        
    }

  return (
    <>
      <div className="listHeader">
        <h1> ⭐ {listName}</h1>
        <div className="button-container">
          <button className="add-new" onClick={() => console.log('new')}>Add New</button>
          <button className="sign-out" onClick={() => console.log('out')}>Sign Out</button>
        </div>
      </div>
    </>
  );
};

export default ListHeader;

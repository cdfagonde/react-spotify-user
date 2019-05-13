import React from "react";
import "./Painel.css";

const Painel = props => {
  // Info do usuario
  // console.log( props.user );
  const userName  = props.user ? props.user.display_name : "";
  const userImage = props.user && props.user.images ? props.user.images[0].url : "";

  if(props.user){
    console.log( props.user );
    //
  }
  
  if(props.playlists){
    console.log( props.playlists );
    //
  }
  // <br clear="all"/>

  return (
    <div className="">
      <div className="user-wrapper" >
        <img className="user-image" src={userImage} alt="" />{" "}
        <h3>{userName}</h3>
      </div>
      

      <div className="playlist-wrapper" >
       { props.playlists &&
         props.playlists.items.map((lista, index) => (
         <a key={"a_"+lista.id} href={lista.external_urls.spotify} rel="noopener noreferrer" target="_blank" >
            <img key={"img_"+lista.id} src={lista.images[0].url} className="playlist-image" title={lista.name} alt={lista.name} />
         </a>
         ))
       }
      </div>

    </div>
  );
}
 export default Painel;

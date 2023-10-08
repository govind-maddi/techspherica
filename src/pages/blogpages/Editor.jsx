import React, { useContext, useEffect, useRef, useState } from 'react'
import Tinymcetexteditor from './blogpagescomponents/Tinymcetexteditor'

import './blogpagesstyles/editor.css'
import { doc, setDoc, collection,getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'

function Editor() {

  const { title } = useParams();
  console.log(title);
  localStorage.removeItem('coverpic');
  return (
    <div id='main_editor_comp'>
        <Tinymcetexteditor title={title}/>
    </div>
  )
}

export default Editor;
import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import ItemList from '../elements/ItemList'
import AddButton from '../elements/AddButton'

const HomePage = () => {
  let [notes, setNotes] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(()=> {
    getNotes()
  }, [])

  let getNotes = async() => {
    let response = await fetch('/api/notes/', {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()

    if(response.status === 200) {
      setNotes(data)
    } else if(response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  return (
    <div className='notes'>
        <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes</h2>
            <p className='notes-count'>{notes.length}</p>
        </div>
        <div className='notes-list'>
            {notes.map((note, index) => (
                <ItemList key={index} note={note} />
            ))}
        </div>
        <AddButton />
    </div>
  )
}

export default HomePage

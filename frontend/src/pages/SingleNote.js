import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const SingleNote = () => {
    let {noteID} = useParams()
    let navigate = useNavigate()
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteID])

    let getNote = async () => {
        if (noteID === 'new') return

        let response = await fetch(`/api/notes/${noteID}/`)
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteID}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = () => {
        fetch(`/api/notes/${noteID}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if (noteID !== 'new' && !note.body) {
            deleteNote()
        } else if (noteID !== 'new') {
            updateNote()
          } else if (noteID === 'new' && note.body !== null) {
                createNote()
            }
        navigate('/')
    }

    let handleChange = (value) => {
        setNote(note => ({...note, 'body':value}))
    }

    return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <ArrowLeft onClick={handleSubmit} />
            </h3>
            {noteID !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ): (
                <button onClick={handleSubmit}>Done</button>
            )}
        </div>
        <textarea onChange={(e) => {handleChange (e.target.value)}} value={note?.body}></textarea>
    </div>
  )
}

export default SingleNote

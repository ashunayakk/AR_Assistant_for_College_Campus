import { useEffect, useRef, useState } from 'react'
import { destinations, searchDestinations, type Destination } from '../data/destinations'
import './VirtualAssistant.css'

interface BaseMessage {
  id: number
  from: 'assistant' | 'user'
}

interface TextMessage extends BaseMessage {
  kind: 'text'
  text: string
}

interface ChipsMessage extends BaseMessage {
  kind: 'chips'
  options: Destination[]
}

interface DirectionsMessage extends BaseMessage {
  kind: 'directions'
  destination: Destination
}

type Message = TextMessage | ChipsMessage | DirectionsMessage

const POPULAR_IDS = ['canteen', 'library', 'admin-block', 'auditorium']

let nextId = 0
function makeId() {
  nextId += 1
  return nextId
}

function popularDestinations(): Destination[] {
  return POPULAR_IDS.map((id) => destinations.find((d) => d.id === id)!).filter(Boolean)
}

export default function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: makeId(),
      from: 'assistant',
      kind: 'text',
      text: "Hi! I'm your campus AR assistant. Where would you like to go?",
    },
    { id: makeId(), from: 'assistant', kind: 'chips', options: popularDestinations() },
  ])
  const [query, setQuery] = useState('')
  const [launching, setLaunching] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function pushMessage(message: Message) {
    setMessages((prev) => [...prev, message])
  }

  function askForDestination(name: string) {
    pushMessage({ id: makeId(), from: 'user', kind: 'text', text: name })

    const matches = searchDestinations(name)

    if (matches.length === 0) {
      pushMessage({
        id: makeId(),
        from: 'assistant',
        kind: 'text',
        text: `I couldn't find "${name}" on campus. Try one of these instead:`,
      })
      pushMessage({ id: makeId(), from: 'assistant', kind: 'chips', options: popularDestinations() })
      return
    }

    if (matches.length === 1) {
      pushMessage({ id: makeId(), from: 'assistant', kind: 'directions', destination: matches[0] })
      return
    }

    pushMessage({
      id: makeId(),
      from: 'assistant',
      kind: 'text',
      text: `I found a few matches for "${name}". Which one did you mean?`,
    })
    pushMessage({ id: makeId(), from: 'assistant', kind: 'chips', options: matches })
  }

  function handleChipClick(destination: Destination) {
    askForDestination(destination.name)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    askForDestination(trimmed)
    setQuery('')
  }

  function handleStartNavigation(destination: Destination) {
    setLaunching(destination.id)
    window.setTimeout(() => {
      setLaunching(null)
      pushMessage({
        id: makeId(),
        from: 'assistant',
        kind: 'text',
        text: `Launching ARway with turn-by-turn AR guidance to ${destination.name}. Follow the on-screen arrows!`,
      })
      pushMessage({
        id: makeId(),
        from: 'assistant',
        kind: 'text',
        text: 'Anywhere else you would like to go?',
      })
      pushMessage({ id: makeId(), from: 'assistant', kind: 'chips', options: popularDestinations() })
    }, 900)
  }

  return (
    <div className="assistant">
      <div className="assistant-header">
        <span className="assistant-avatar" aria-hidden="true">
          🧭
        </span>
        <div>
          <h3>Campus Virtual Assistant</h3>
          <p>Ask where you want to go — I'll guide you there.</p>
        </div>
      </div>

      <div className="assistant-messages" ref={scrollRef}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onChipClick={handleChipClick}
            onStartNavigation={handleStartNavigation}
            launching={launching}
          />
        ))}
      </div>

      <form className="assistant-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a destination, e.g. library"
          aria-label="Ask the assistant where you want to go"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

function MessageBubble({
  message,
  onChipClick,
  onStartNavigation,
  launching,
}: {
  message: Message
  onChipClick: (destination: Destination) => void
  onStartNavigation: (destination: Destination) => void
  launching: string | null
}) {
  if (message.kind === 'text') {
    return (
      <div className={`bubble-row ${message.from}`}>
        <div className="bubble">{message.text}</div>
      </div>
    )
  }

  if (message.kind === 'chips') {
    return (
      <div className="bubble-row assistant">
        <div className="chips">
          {message.options.map((option) => (
            <button key={option.id} type="button" className="chip" onClick={() => onChipClick(option)}>
              {option.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const { destination } = message
  return (
    <div className="bubble-row assistant">
      <div className="bubble directions-card">
        <div className="directions-title">
          <strong>{destination.name}</strong>
          <span className="pill">{destination.category}</span>
        </div>
        <p className="directions-meta">
          {destination.distanceM} m · ~{destination.walkTimeMin} min walk
        </p>
        <ol>
          {destination.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <button
          type="button"
          className="cta"
          disabled={launching === destination.id}
          onClick={() => onStartNavigation(destination)}
        >
          {launching === destination.id ? 'Launching ARway…' : 'Start AR Navigation'}
        </button>
      </div>
    </div>
  )
}

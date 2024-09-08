import { useMemo, useState } from "react"
import { Event, legendEvents, normalEvents, rareEvents } from "@/app/orb-match/core/events"
import { getRandomInt } from "@/app/common/utils/math"
import { LEGEND_EVENT_RATE, RARE_EVENT_RATE } from "../constants/rate"
import Card from "@/app/common/components/ui/card"

const EventSelector: React.FC<{
  stage: number,
  onSelect: (event: Event) => void
}> = ({ stage, onSelect }) => {
  const events = useMemo(() => {
    const pickupEvents: Event[] = []

    const _normalEvents = [...normalEvents]
    const _rareEvents = [...rareEvents]
    const _legentEvents = [...legendEvents]

    const spliceEvent = (events: Event[]) => {
      const [event] = events.splice(getRandomInt(0, events.length), 1)
      return event
    }

    const pickEvent = () => {
      let random = Math.random()
      if (random < LEGEND_EVENT_RATE) { return spliceEvent(_legentEvents) }
      if (random - LEGEND_EVENT_RATE < RARE_EVENT_RATE) { return spliceEvent(_rareEvents) }
      return spliceEvent(_normalEvents)
    }

    const isBonus = stage % 3 === 0
    if (isBonus) {
      const legendEvent = spliceEvent(_legentEvents)
      pickupEvents.push(legendEvent)
    }

    while (pickupEvents.length < 3) {
      const event = pickEvent()
      pickupEvents.push(event)
    }

    return pickupEvents
  }, [stage])

  const [selectedEvent, setSelectedEvent] = useState<null | Event>(null)

  const confirmEvent = () => {
    if (!selectedEvent) { return }

    setSelectedEvent(null)
    onSelect(selectedEvent)
  }

  return (<>
    <div className='flex gap-40'>
      {events.map((event) => (
        <Card
          onClick={() => setSelectedEvent(event)}
          className={
            'w-52 h-72 cursor-pointer ' + (
              selectedEvent === event ? 'shadow-2xl shadow-blue-500' : ''
            )}
          key={event.id}
        >
          <h2 className='font-bold text-lg'>{event.name}</h2>
          <p className='my-1'>{event.description}</p>
          {
            event.dependences.length ? <ul className="p-2 h-32 mt-auto rounded bg-slate-400 overflow-y-auto scroll-bar">
              {event.dependences.map((dep, index) => (
                <li key={dep.name} className={'border-slate-300 ' + (
                  index ? 'border-b' : ''
                )}>
                  <h3 className="text-sm font-bold">{dep.name}</h3>
                  <p className="text-xs">{dep.description}</p>
                </li>
              ))}
            </ul> : null
          }
        </Card>
      ))}
    </div>
    <div className="flex justify-center mt-16 w-full">
      <button
        onClick={confirmEvent}
        disabled={selectedEvent === null}
        className='px-12 py-2 rounded bg-blue-200 hover:bg-blue-100 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed'
      >確認</button>
    </div>

  </>)
}

export default EventSelector
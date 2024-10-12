import { useMemo, useState } from "react"
import { Event } from "@/app/orb-match/core/events"
import Card from "@/app/common/components/ui/card"

const EventSelector: React.FC<{
  stage: number,
  onSelect: (event: Event) => void
}> = ({ stage, onSelect }) => {
  const events = useMemo(() => {
    const pickupEvents: Event[] = []

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
import { useState } from 'react'
import Picker from 'react-mobile-picker'
import { generateRangeArray } from '../utils/rangeArray'

interface SelectionType {
    hour: number[], minute: number[], second: number[]
}

const selections: SelectionType = {
    hour: generateRangeArray(2, 0),
    minute: generateRangeArray(59, 0),
    second: generateRangeArray(59, 0)
}

function MyPicker() {
    const [pickerValue, setPickerValue] = useState({
        hour: 0,
        minute: 0,
        second: 0
    })

    return (
        <div className='bg-primary text-white w-[250px]' >

            <Picker value={pickerValue} onChange={setPickerValue} itemHeight={30} height={300} wheelMode='natural'>
                <Picker.Column name="hour" className='w-[50px]'>
                    {
                        selections.hour.map((h) => <Picker.Item value={h} key={h}>
                            {({ selected }) => (
                                /* Use the `selected` state to conditionally style the selected item */
                                <div style={{ color: selected ? 'red' : 'white' }}>
                                    {h}
                                </div>
                            )}
                        </Picker.Item>)
                    }
                </Picker.Column>
                <Picker.Column name="minute">
                    {
                        selections.minute.map((m) => <Picker.Item value={m} key={m}>
                            {({ selected }) => (
                                /* Use the `selected` state to conditionally style the selected item */
                                <div style={{ color: selected ? 'red' : 'white' }}>
                                    {m}
                                </div>
                            )}
                        </Picker.Item>)
                    }
                </Picker.Column>
                <Picker.Column name="second">
                    {
                        selections.second.map((s) => <Picker.Item value={s} key={s}>
                            {({ selected }) => (
                                /* Use the `selected` state to conditionally style the selected item */
                                <div style={{ color: selected ? 'red' : 'white' }}>
                                    {s}
                                </div>
                            )}
                        </Picker.Item>)
                    }
                </Picker.Column>
            </Picker>
            <button onClick={() => console.log(pickerValue)}>Check</button>
        </div>
    )
}

export default MyPicker;

import React, { useState, useRef } from "react";
import { makeid } from "../utils/string"
export default ({ allOption, options = [], onChange }) => {
    let _options = options;
    if (options.length > 0 && !options[0].key) {
        for(const opt in options) {
            _options[opt] = { key: options[opt], value: options[opt] }
        }
    }

    if (allOption) {
        _options = [ { key: "all", value: "All"}, ..._options];
    }

    const detailRef = useRef(null);
    const [selected, setSelected] = useState(_options[0].key);
    const handleOptionChange = (key, value) => {
        detailRef.current.removeAttribute("open")
        setSelected(key)
        onChange({ target: { value: key, label: value}})
    };
    
    const uniqueName = makeid(5);

    return (
        <details ref={detailRef} className="custom-select">
            <summary className={`radios newd__custom__select__summary ${selected !=='all' ? 'newd__violet' : ''}`}>
                { _options.map((data) => (
                    <input type="radio"
                        name={uniqueName}
                        key={data.key}
                        checked={selected === data.key}
                        onChange={() => handleOptionChange(data.key, data.value)}
                        title={data.value}/>
                ))}
            </summary>
            <ul className="list newd__select__list">
                { _options.map((data) => (
                    <li key={data.key} onClick={() => handleOptionChange(data.key, data.value)}>
                        {data.value}
                    </li>
                ))}
            </ul>
        </details>
    )
}

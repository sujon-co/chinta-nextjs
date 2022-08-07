import { useState } from "react";

export default function Hello() {
    const [count, setCount] = useState(0);

    const increment = () => {
        for (let i = 0; i < 5; i++) {
            setCount(count + 1);
            console.log({ count });
        }
    };

    return (
        <div>
            <p>{count}</p>
            <div>
                <button onClick={increment}>Increment</button>
            </div>
        </div>
    );
}
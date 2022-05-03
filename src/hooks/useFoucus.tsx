import { useRef, useEffect, useState } from "react";

export const useFocus = () => {
    const [focus, setFocus] = useState();
    const inputFocus = useRef<HTMLInputElement>(null);
    
    useEffect(()=>{
        inputFocus.current?.focus()
    },[focus])
    
    return [inputFocus, focus, setFocus]
  };
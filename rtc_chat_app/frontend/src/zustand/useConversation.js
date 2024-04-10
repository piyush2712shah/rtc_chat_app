import {create} from 'zustand'

//below lines are just like state
const useConversation=create((set)=>({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation) =>set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),
}))

export default useConversation;
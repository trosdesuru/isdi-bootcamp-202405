export default function Button({ children, ...nextProps }) {
    console.debug('Button -> call')

    return <button className="text-gray-600 cursor-pointer" {...nextProps}>{children}</button>
}

// export default function Button({ children, special = false, ...nextProps }) {
//     return <button className={`px-4 py-2 rounded-md ${special ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`} {...nextProps}>
//         {children}
//     </button>;
// }
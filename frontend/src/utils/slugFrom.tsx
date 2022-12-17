const slugFrom = (name: string, surname: string, id: number) => {
    return [name.toLowerCase(), surname.toLowerCase(), id].join('-')
}

export default slugFrom
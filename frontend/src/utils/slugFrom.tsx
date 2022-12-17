const slugFrom = (name: string, surname: string, id: number) => {
    return [name.toLowerCase().split(' ').join('-'), surname.toLowerCase().split(' ').join('-'), id].join('-')
}

export default slugFrom
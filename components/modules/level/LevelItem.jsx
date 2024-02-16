function LevelItem({name,lessonsCount=0}) {
    return (
        <div className="">
            <span>{name}</span>
            <span>{lessonsCount}</span>
        </div>
    )
}

export default LevelItem

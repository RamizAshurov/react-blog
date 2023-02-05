import "./search-panel.css"

function SearchPanel(props) {
    const { sortValue, handleSortChange, filterValue, handleFilterChange, searchValue, handleSearchChange, users } = props;

    return (
        <div className="search-panel">
            <input 
                value={searchValue}
                onChange={handleSearchChange}
                type="text" 
                placeholder="Type to search..." 
            />
            <br/>
            <select className="sort" value={sortValue} onChange={handleSortChange}>
                <option value="" disabled>Сортировка</option>
                <option value="date">По дате</option>
                <option value="title">По названию</option>
            </select>
            <select value={filterValue} onChange={handleFilterChange}>
                <option value="">Все</option>
                {
                    users.length && 
                    users.map(user => {
                        return (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default SearchPanel
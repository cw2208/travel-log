export function SortButton(props) {
    let iconClasses = ""
    if (props.active) { iconClasses += ` active` }
    if (props.ascending) { iconClasses += ` flip` };
  
    return (
      <div className="sort-button-container">
        <p>Sort by Date</p>
        <button name={props.name} onClick={props.onClick} className="sort-button">
          <span className={"material-icons" + iconClasses} aria-label={`sort by ${props.name}`}>sort</span>
        </button>
      </div>
    );
  }
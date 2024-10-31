export const initGrid = (container) => {
    const columns = [];
    const columnsHeight = [];
    const columnCount = getComputedStyle(container).getPropertyValue("--column-count");
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement("div");
        column.classList.add("column");
        container.appendChild(column);
        columns.push(column);
        columnsHeight.push(0)
    }
    return { columns, columnsHeight };
}
export const updateGrid = (card, columnsHeight, columns) => { 
    const minColumnHeight = columnsHeight.indexOf(Math.min(...columnsHeight));
    columns[minColumnHeight].appendChild(card);
    columnsHeight[minColumnHeight] = columns[minColumnHeight].offsetHeight;
}
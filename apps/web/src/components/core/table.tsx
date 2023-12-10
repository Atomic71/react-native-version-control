interface BaseItem {
  id: number | string;
}

interface TableProps<T> {
  headers: Header<T>[];
  items: T[];
  itemKey?: string;
}

interface Header<T> {
  key: string;
  title: string;
  headerStyle?: string;
  tooltip?: string;
  tooltipIcon?: string;
  render?: (item: T) => JSX.Element;
}

function Table<T extends BaseItem>(props: TableProps<T>): JSX.Element {
  const { items, headers } = props;

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {headers.map((header) => (
              <td key={header.key}>
                {header.render ? header.render(item) : item[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

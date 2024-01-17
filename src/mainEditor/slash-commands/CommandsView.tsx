import React, { Component } from "react";
import { SuggestionProps } from "@tiptap/suggestion";

class CommandsView extends Component<SuggestionProps> {
  state = {
    selectedIndex: null,
  };
  commandListContainer = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.setState({ selectedIndex: 0 });
    this.ensureVisible();
  }

  componentDidUpdate(prevProps: SuggestionProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({ selectedIndex: 0 });
    }

    if (this.state.selectedIndex !== null) {
      this.ensureVisible();
    }
  }

  ensureVisible() {
    const container = this.commandListContainer.current;
    if (!container) return;

    const selectedItem = container.children[this.state.selectedIndex];
    if (!selectedItem) return;

    const selectedItemRect = selectedItem.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    if (selectedItemRect.bottom > containerRect.bottom) {
      container.scrollTop += selectedItemRect.bottom - containerRect.bottom;
    } else if (selectedItemRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - selectedItemRect.top;
    }
  }

  selectItem = (index: number | null) => {
    const item = this.props.items[index || 0];
    if (item) {
      this.props.command(item);
    }
  };

  upHandler = () => {
    this.setState((prevState) => ({
      selectedIndex:
        (prevState.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    }));
  };

  downHandler = () => {
    this.setState((prevState) => ({
      selectedIndex: (prevState.selectedIndex + 1) % this.props.items.length,
    }));
  };

  enterHandler = () => {
    this.selectItem(this.state.selectedIndex);
  };

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        this.upHandler();
        return true;
      case "ArrowDown":
        this.downHandler();
        return true;
      case "Enter":
        this.enterHandler();
        return true;
      default:
        return false;
    }
  };

  render() {
    const { items } = this.props;
    return (
      <div
        ref={this.commandListContainer}
        className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto scroll-smooth rounded-md border border-gray-200 bg-white px-1 py-2 shadow-md transition-all"
      >
        {items.map((item, index) => (
          <button
            type="button"
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-gray-900 hover:bg-gray-100 ${
              index === this.state.selectedIndex
                ? "bg-blue-100 text-blue-900"
                : "text-gray-900 hover:bg-gray-100"
            }`}
            {...item.attrs}
            key={index}
            onClick={() => this.selectItem(index)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white">
              {item.icon && React.createElement(item.icon, { size: 16 })}
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">{item.element}</p>
            </div>
          </button>
        ))}
      </div>
    );
  }
}

export default CommandsView;

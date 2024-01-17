import { Extension } from '@tiptap/core';
import { NodeSelection, Plugin } from '@tiptap/pm/state';

export const NodeNavigation = Extension.create({
  name: 'nodeNavigation',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown(view, event) {
            if (event.altKey && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
              const direction = event.key === 'ArrowDown' ? 'forward' : 'backward';
              const { state, dispatch } = view;
              const { doc, selection } = state;
              let { $head } = selection;

              let newPos = null;
              if (direction === 'forward') {
                if ($head.after() < doc.content.size) {
                  newPos = $head.after();
                }
              } else {
                if ($head.before() > 0) {
                  newPos = $head.before();
                }
              }

              if (newPos !== null) {
                const newSelection = NodeSelection.create(doc, newPos);
                dispatch(state.tr.setSelection(newSelection));
                return true;
              }
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default NodeNavigation;

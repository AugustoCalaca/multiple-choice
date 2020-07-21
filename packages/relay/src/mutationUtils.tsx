import { ConnectionHandler, RecordSourceSelectorProxy } from 'relay-runtime';

export const ROOT_ID = 'client:root';

type ConnectionUpdater = {
  store: RecordSourceSelectorProxy;
  parentId: string;
  connectionName: string;
  edge: any;
  before?: boolean;
  filters?: object;
  cursor?: string;
};
export function connectionUpdater({
  store,
  parentId,
  connectionName,
  edge,
  before = false,
  filters,
  cursor,
}: ConnectionUpdater) {
  if (edge) {
    if (!parentId) {
      // eslint-disable-next-line no-console
      console.log('maybe you forgot to pass a parentId: ');
      return;
    }

    const parentProxy = store.get(parentId);
    // @ts-ignore
    const connection = ConnectionHandler.getConnection(parentProxy, connectionName, filters);

    if (!connection) {
      // eslint-disable-next-line no-console
      console.log('maybe this connection is not in relay store yet:', connectionName);
      return;
    }

    if (before) {
      ConnectionHandler.insertEdgeBefore(connection, edge, cursor);
    } else {
      ConnectionHandler.insertEdgeAfter(connection, edge, cursor);
    }
  }
}

type ConnectionDeleteEdgeUpdater = {
  parentId: string;
  connectionName: string;
  nodeId: string;
  store: RecordSourceSelectorProxy;
  filters?: object;
};
export function connectionDeleteEdgeUpdater({
  parentId,
  connectionName,
  nodeId,
  store,
  filters,
}: ConnectionDeleteEdgeUpdater) {
  const parentProxy = parentId === null ? store.getRoot() : store.get(parentId);
  // @ts-ignore
  const connection = ConnectionHandler.getConnection(parentProxy, connectionName, filters);

  if (!connection) {
    // eslint-disable-next-line no-console
    console.log(
      `Connection ${connectionName} not found on ${parentId}, maybe this connection is not in relay store yet`,
    );
    return;
  }

  ConnectionHandler.deleteNode(connection, nodeId);
}

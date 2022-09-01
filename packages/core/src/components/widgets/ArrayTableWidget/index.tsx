import React from 'react';
import { Button, ConfigProvider, Divider, Popconfirm, Table } from 'antd';
import { IArrayField } from 'typings';
import FieldRender from '../../fields';
import CollapseWidget from '../CollapseWidget';
import Title from '../CollapseWidget/title';
import './index.less';

const { ConfigContext } = ConfigProvider;

function ArrayTableWidget<DecoratorProps, ComponentProps>(props: IArrayField<DecoratorProps, ComponentProps>) {
  const {
    dataSource,
    items,
    field,
    layout,
    disabled,
    onAdd,
    onRemove,
    onCopy,
    onDown,
    onUp,
    props: compProps = {},
  } = props;
  const context = React.useContext(ConfigContext);
  const cssPrefix = context.getPrefixCls('array-table');
  const operations = ['copy', 'sort', 'remove'].map((item) => compProps[item]).filter(Boolean);
  const btnProps: any = {
    disabled,
    type: 'link',
    style: {
      padding: 0,
    },
  };

  const columns: any[] = Object.entries(items.properties).map(([key, schema], index) => ({
    title: <Title {...schema} />,
    key,
    ellipsis: true,
    align: 'center',
    render: (_: any, item: any, index: number) => (
      <FieldRender
        schema={{ ...schema, title: '' }}
        field={field}
        metaKey={[item.name, key]}
        layout={layout}
        disabled={disabled}
      />
    ),
  }));

  if (operations.length > 0) {
    columns.push({
      title: '操作',
      key: 'op',
      fixed: 'right',
      align: 'center',
      width: 250,
      render: (_: any, record: any, index: number) => (
        <React.Fragment>
          {[
            compProps.copy && (
              <Button {...btnProps} key="copy" onClick={() => onCopy(index)}>
                复制
              </Button>
            ),
            compProps.sort && (
              <Button {...btnProps} key="up" disabled={disabled || index === 0} onClick={() => onUp(index)}>
                上移
              </Button>
            ),
            compProps.sort && (
              <Button
                {...btnProps}
                key="down"
                disabled={disabled || index === dataSource.length - 1}
                onClick={() => onDown(index)}
              >
                下移
              </Button>
            ),
            compProps.remove && (
              <Popconfirm
                title="确认删除吗？"
                key="remove"
                onConfirm={() => onRemove(index)}
                okText="是"
                cancelText="否"
              >
                <Button {...btnProps}>删除</Button>
              </Popconfirm>
            ),
          ]
            .filter(Boolean)
            .map((node, nodeIndex, list) => (
              <React.Fragment key={nodeIndex}>
                {node}
                {list.length - 1 !== nodeIndex && <Divider type="vertical" />}
              </React.Fragment>
            ))}
        </React.Fragment>
      ),
    });
  }

  return (
    <CollapseWidget {...props} className={`${cssPrefix}-list`}>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        scroll={columns.length > 5 ? { x: 1500, y: 300 } : {}}
        pagination={false}
        footer={() => {
          if (compProps.add) {
            return (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="small" type="primary" onClick={onAdd}>
                  {compProps.addBtnText || '新增一条'}
                </Button>
              </div>
            );
          }
          return null;
        }}
      />
    </CollapseWidget>
  );
}

export default ArrayTableWidget;

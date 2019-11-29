import React from 'react';
import autoBind from 'react-autobind';
import { t } from 'locales';
import Fetch from 'library/Fetch';
import { timing, toMoney, diff } from 'library/Helper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table'
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import Switch from '@material-ui/core/Switch';
import Context from 'library/Context';

class Screen extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
        };
        autoBind(this);
    }
    update(user) {
        this.context.game.send({ user });
    }
    render() {
        return (
            <Grid item xs={12}>
                <Paper style={styles.root}>
                    <MaterialTable
                        title={t('Users')}
                        columns={[
                            { title: t('username'), field: 'username', editable: 'onAdd' },
                            { title: t('email'), field: 'email', editable: 'onAdd' },
                            { title: t('realBalance'), field: 'realBalance', render: row => (toMoney(row.realBalance)) },
                            { title: t('practiceBalance'), field: 'practiceBalance', editable: 'onUpdate', render: row => (toMoney(row.practiceBalance)) },
                            { title: t('joinedAt'), field: 'joinedAt', editable: 'never', render: row => (row ? timing(row.joinedAt) : null) },
                            { title: t('lastSeen'), field: 'lastSeen', editable: 'never', render: row => (row ? timing(row.lastSeen) : null) },
                            {
                                title: t('status'),
                                field: 'status',
                                render: row => (row.status ? <CheckIcon /> : <BlockIcon />),
                                editComponent: props => (
                                    <Switch
                                        checked={props.value}
                                        onChange={() => props.onChange(!props.value)}
                                        color="primary"
                                    />
                                )
                            },
                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                Fetch('manage/list', {
                                    type: 'user',
                                    page: (query.page + 1),
                                    perPage: query.pageSize
                                }, (result) => {
                                    resolve({
                                        data: result.data,
                                        page: result.page - 1,
                                        totalCount: result.total,
                                    })
                                })
                            })
                        }
                        editable={{
                            // onRowAdd: newData =>
                            //     new Promise((resolve, reject) => {
                            //         Fetch('manage/add', {
                            //             type: 'user',
                            //             data: JSON.stringify(newData)
                            //         }, (result) => {
                            //             resolve();
                            //         })
                            //     }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    let data = diff(newData, oldData);
                                    if (Object.keys(data).length > 0) {
                                        Fetch('manage/update', {
                                            type: 'user',
                                            id: oldData.id,
                                            data: JSON.stringify(data)
                                        }, (result) => {
                                            this.update(oldData.id)
                                            resolve();
                                        })
                                    }
                                    else {
                                        resolve();
                                    }
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    Fetch('manage/delete', {
                                        type: 'user',
                                        id: oldData.id,
                                    }, (result) => {
                                        resolve();
                                    })
                                }),
                        }}
                    />
                </Paper>
            </Grid>
        );
    }
}

const styles = {
    root: {
        width: '100%',
    },
}
export default Screen;
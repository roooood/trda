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
    update() {
        this.context.game.send({ refresh: true });
    }
    render() {
        return (
            <Grid item xs={12}>
                <Paper style={styles.root}>
                    <MaterialTable
                        title={t('Setting')}
                        columns={[
                            { title: t('key'), field: 'key', editable: 'onAdd' },
                            { title: t('value'), field: 'value' },

                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                Fetch('manage/list', {
                                    type: 'setting',
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
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    Fetch('manage/add', {
                                        type: 'setting',
                                        data: JSON.stringify(newData)
                                    }, (result) => {
                                        this.update();
                                        resolve();
                                    })
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    let data = diff(newData, oldData);
                                    if (Object.keys(data).length > 0) {
                                        Fetch('manage/update', {
                                            type: 'setting',
                                            id: oldData.id,
                                            data: JSON.stringify(data)
                                        }, (result) => {
                                            this.update();
                                            resolve();
                                        })
                                    }
                                    else {
                                        resolve();
                                    }
                                }),
                            // onRowDelete: oldData =>
                            //     new Promise(resolve => {
                            //         Fetch('manage/delete', {
                            //             type: 'setting',
                            //             id: oldData.id,
                            //         }, (result) => {
                            //             resolve();
                            //         })
                            //     }),
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
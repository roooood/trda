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


class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        };
        autoBind(this);
    }
    render() {
        return (
            <Grid item xs={12}>
                <Paper style={styles.root}>
                    <MaterialTable
                        title={t('Markets')}
                        columns={[
                            { title: t('type'), field: 'type', lookup: { crypto: 'crypto', forex: 'forex', stocks: 'stocks' } },
                            { title: t('symbol'), field: 'symbol' },
                            { title: t('display'), field: 'display' },
                            { title: t('description'), field: 'description' },

                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                Fetch('manage/list', {
                                    type: 'market',
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
                                        type: 'market',
                                        data: JSON.stringify(newData)
                                    }, (result) => {
                                        resolve();
                                    })
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    let data = diff(newData, oldData);
                                    if (Object.keys(data).length > 0) {
                                        Fetch('manage/update', {
                                            type: 'market',
                                            id: oldData.id,
                                            data: JSON.stringify(data)
                                        }, (result) => {
                                            resolve();
                                        })
                                    }
                                }),
                            onRowDelete: oldData =>
                                new Promise(resolve => {
                                    Fetch('manage/delete', {
                                        type: 'market',
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
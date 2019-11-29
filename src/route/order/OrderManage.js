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
        };
        autoBind(this);
    }
    render() {
        return (
            <Grid item xs={12}>
                <Paper style={styles.root}>
                    <MaterialTable
                        title={t('Orders')}
                        columns={[
                            { title: t('balance'), field: 'balanceType', lookup: { real: 'real', practice: 'practice' } },
                            { title: t('type'), field: 'tradeType', lookup: { buy: 'buy', sell: 'sell' } },
                            { title: t('price'), field: 'price' },
                            { title: t('status'), field: 'status', lookup: { done: 'done', pending: 'pending' } },
                            { title: t('bet'), field: 'bet', render: row => (toMoney(row.bet)) },
                            { title: t('profit'), field: 'profit', render: row => (row.profit + '%') },
                            { title: t('amount'), field: 'amount', render: row => (toMoney(row.amount)) },
                            { title: t('trade in'), field: 'point', render: row => (timing(row.point, true)), editable: 'never' },
                            { title: t('trade at'), field: 'tradeAt', render: row => (timing(row.tradeAt, true)), editable: 'never' },

                        ]}
                        data={query =>
                            new Promise((resolve, reject) => {
                                Fetch('manage/list', {
                                    type: 'order',
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
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    let data = diff(newData, oldData);
                                    if (Object.keys(data).length > 0) {
                                        Fetch('manage/update', {
                                            type: 'order',
                                            id: oldData.id,
                                            data: JSON.stringify(data)
                                        }, (result) => {
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
                                        type: 'order',
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
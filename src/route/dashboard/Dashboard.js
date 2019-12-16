import React from 'react';
import autoBind from 'react-autobind';
import { t } from 'locales';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { timing, toMoney, diff } from 'library/Helper';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table'
import Context from 'library/Context';

class Dashboard extends React.Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            online: '-',
            orders: [],
        };
        autoBind(this);
    }
    componentDidMount() {
        this.context.game.register('online', this.onlines);
        this.context.game.register('orders', this.orders);
        this.context.game.send({ get: 'AdminData' });
    }
    orders(orders) {
        this.setState({ orders: [...orders, this.state.orders] })
    }
    onlines(online) {
        this.setState({ online })
    }
    render() {
        return (
            <Grid item xs={12}>
                <Grid item xs={3}>
                    <Card >
                        <CardHeader style={styles.header} title={t('onlines')} />
                        <CardContent>
                            <Typography style={styles.count}>
                                {toMoney(this.state.online)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Paper style={styles.root}>
                        <MaterialTable
                            title={t('openOrders')}
                            options={{
                                search: false
                            }}
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
                            data={this.state.orders}
                        />
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const styles = {
    header: {
        background: '#eee',
        textAlign: 'center',

    },
    count: {
        fontSize: 25,
        textAlign: 'center',
        color: 'rgb(56, 199, 232)'
    }
}
export default Dashboard;
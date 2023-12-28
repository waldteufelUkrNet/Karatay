var exports = module.exports = {};


var {getMyActiveOrder, createNewOrder, getOrdersHistory,
   startWork, updateOrderCheck, customerCancelAskExecutorOrder, customerCloseOrder, testFunction} = require('./current');
var {startWork, updateOrderCheck} = require('./start_work');
var {getOrdersForLater} = require('./customer');
var {getOrderById} = require('./global');
var {endWork, confirmEndWork} = require('./end_work');
var {checkNewOrderTimers, checkSoonOrdersTimer} = require('./additional_timers');
var {executorAcceptOffer, executorDeclineOffer} = require('./executor');
var {findExecutorForNow, askExecutor, askExecutorTimer} = require('./for_now');
var {findOrdersForFuture, getExecutorOffers, onMyWay, getMyOfferByOrder, createOrderOffer, approveExecutorOffers,cancelOrderForLater, getPlannedOrdersForFuture, cancelOrderOffer} = require('./for_later');
var {cancelOrder, cancelOrderConfirm} = require('./cancel');
var {getAddressOnlyApprovedOffersOrders, getOfficeOnlyApprovedOffersOrders, getAllApprovedOffersOrders, getAddressUnofferedOrders,
    getOfficeUnofferedOrders, getApprovedAndOfferedOrders} = require('./lists_for_executor');
/*
var {getMyActiveOrder, createNewOrder, getOrdersHistory, startWork, updateOrderCheck, customerCloseOrder, testFunction} = require('./current');
var {executorAcceptOffer, executorDeclineOffer} = require('./executor');
var {findExecutorForNow} = require('./for_now');
var {findOrdersForFuture} = require('./for_later');
*/

exports.getMyActiveOrder = getMyActiveOrder;
exports.getOrdersForLater = getOrdersForLater;
exports.createNewOrder = createNewOrder;
exports.getOrdersHistory = getOrdersHistory;
exports.findExecutorForNow = findExecutorForNow;
exports.executorAcceptOffer = executorAcceptOffer;
exports.findOrdersForFuture = findOrdersForFuture;
exports.startWork = startWork;
exports.getMyOfferByOrder = getMyOfferByOrder;
exports.executorDeclineOffer = executorDeclineOffer;
exports.updateOrderCheck = updateOrderCheck;
exports.customerCloseOrder = customerCloseOrder;
exports.testFunction = testFunction;
exports.getPlannedOrdersForFuture = getPlannedOrdersForFuture;
exports.cancelOrderForLater = cancelOrderForLater;
exports.customerCancelAskExecutorOrder = customerCancelAskExecutorOrder;

exports.checkSoonOrdersTimer = checkSoonOrdersTimer;

exports.createOrderOffer = createOrderOffer;
exports.getExecutorOffers = getExecutorOffers;

exports.askExecutor = askExecutor;
exports.askExecutorTimer = askExecutorTimer;
exports.cancelOrder = cancelOrder;
exports.cancelOrderConfirm = cancelOrderConfirm;
exports.approveExecutorOffers = approveExecutorOffers;
exports.cancelOrderOffer = cancelOrderOffer;

exports.onMyWay = onMyWay;
exports.endWork = endWork;
exports.confirmEndWork = confirmEndWork;
exports.checkNewOrderTimers = checkNewOrderTimers;
//lists_for_executor
exports.getAddressOnlyApprovedOffersOrders = getAddressOnlyApprovedOffersOrders;
exports.getOfficeOnlyApprovedOffersOrders = getOfficeOnlyApprovedOffersOrders;
exports.getAllApprovedOffersOrders = getAllApprovedOffersOrders;
exports.getAddressUnofferedOrders = getAddressUnofferedOrders;
exports.getOfficeUnofferedOrders = getOfficeUnofferedOrders;
exports.getApprovedAndOfferedOrders = getApprovedAndOfferedOrders;
exports.getOrderById = getOrderById;
//exports.executorDeclineOffer = executorDeclineOffer;

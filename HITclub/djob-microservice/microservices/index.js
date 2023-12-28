amqpLib = require('../libs/amqp');
var customer_task = require('./customer/index');
var executor_task = require('./executor/index');
var order_task = require('./order/index');
var global_task = require('./global/index');
var speciality_task = require('./speciality/index');
var admin_task = require('./admin/index');
var organization_task = require('./organization/index');
var qiwi_task = require('./qiwi/index');
var McCanel;

function setChannel(ch) {
    McCanel = ch;
}

function start(msg) {
    let msgData = JSON.parse(msg.content.toString());
    let action = msgData.action;
    let key = msgData.key;
    let pid = msgData.worker_pid;
    let data = msgData.data;
    if(!data)
        data = {};
    data.auth_user = msgData.user;

    // console.log("GOTDATA FROM RABBIT ",data)
    if(!action || !key)
        McCanel.ack(msg);

      // console.log("got some reuest from PID "+ pid+" with action "+action)

    // console.log('------------ Action --------------', action);

    // runTask(organization_task.killAllProccess(data), msg, pid,  key);

    switch(action) {
        case 'customer_send_code':
          runTask(customer_task.sendCode(data), msg, pid,  key);
          break;
        case 'customer_login':
          runTask(customer_task.login(data), msg, pid, key);
          break;
        case 'customer_logout':
            runTask(customer_task.logOut(data), msg, pid, key);
            break;
        case 'get_customer_me':
          runTask(customer_task.getCustomerMe(data), msg, pid,  key);
          break;
        case 'update_customer_me':
          runTask(customer_task.updateCustomerMe(data), msg, pid, key);
          break;
        case 'update_customer_push_token':
            runTask(customer_task.updateCustomerPushToken(data), msg, pid, key);
            break;
        case 'customer_set_location':
            runTask(customer_task.setLocation(data), msg, pid, key);
            break;
        case 'customer_activate_promo':
          runTask(customer_task.activatePromo(data), msg, pid, key);
          break;
        case 'customer_referral_history':
          runTask(customer_task.getCustomerReferralHistory(data), msg, pid, key);
          break;
        case 'customer_referral_transfer':
          runTask(customer_task.customerReferralTransfer(data), msg, pid, key);
          break;
          case 'get_customer_marks':
              runTask(customer_task.getCustomerMarks(data), msg, pid, key);
              break;
          case 'customer_referral_link':
              runTask(customer_task.getReferralLink(data), msg, pid, key);
              break;
          case 'customer_get_refill_form':
              runTask(customer_task.getRefillForm(data), msg, pid, key);
              break;

          case 'executor_get_refill_form':
            runTask(executor_task.getRefillForm(data), msg, pid,  key);
            break;
          case 'executor_send_code':
            runTask(executor_task.sendCode(data), msg, pid,  key);
            break;
          case 'executor_login':
            runTask(executor_task.login(data), msg, pid, key);
            break;
          case 'executor_logout':
              runTask(executor_task.logOut(data), msg, pid, key);
              break;
          case 'executor_login_by_token':
            runTask(executor_task.loginByToken(data), msg, pid, key);
            break;
          case 'executor_registration':
            runTask(executor_task.registration(data), msg, pid, key);
            break;

        case 'executor_get_profile':
          runTask(executor_task.getExecutorMe(data), msg, pid, key);
          break;
        case 'executor_save_profile':
          runTask(executor_task.updateExecutorMe(data), msg, pid, key);
          break;
        case 'executor_add_speciality':
          runTask(executor_task.addSpeciality(data), msg, pid, key);
          break;
        case 'executor_update_speciality':
          runTask(executor_task.updateSpeciality(data), msg, pid, key);
          break;
        case 'executor_delete_speciality':
          runTask(executor_task.deleteSpeciality(data), msg, pid, key);
          break;
        case 'executor_set_location':
          runTask(executor_task.setLocation(data), msg, pid, key);
          break;
        case 'executor_set_office':
          runTask(executor_task.setOffice(data), msg, pid, key);
          break;
        case 'executor_remove_office':
          runTask(executor_task.removeOffice(data), msg, pid, key);
          break;
        case 'executor_set_status':
          runTask(executor_task.setStatus(data), msg, pid, key);
          break;
        case 'executor_activate_promo':
            runTask(executor_task.activateExecutorPromo(data), msg, pid, key);
            break;
        case 'update_executor_push_token':
          runTask(executor_task.updateExecutorPushToken(data), msg, pid, key);
          break;
        case 'executor_referral_history':
          runTask(executor_task.getExecutorReferralHistory(data), msg, pid, key);
          break;
        case 'executor_referral_link':
            runTask(executor_task.getReferralLink(data), msg, pid, key);
            break;
        case 'executor_referral_transfer':
          runTask(executor_task.executorReferralTransfer(data), msg, pid, key);
          break;
        case 'get_executor_marks':
            runTask(executor_task.getExecutorMarks(data), msg, pid, key);
            break;
          //getExecutorProfile
          case 'get_executor_full_profile':
            runTask(executor_task.getExecutorProfile(data), msg, pid, key);
            break;
          case 'get_my_active_order':
          runTask(order_task.getMyActiveOrder(data), msg, pid,  key);
          break;
          case 'create_order':
          runTask(order_task.createNewOrder(data), msg, pid,  key);
          break;

//          ----------------------- Cards -------------------------------------
        case 'customer_update_card':
            runTask(customer_task.updateCard(data), msg, pid, key);
            break;
        case 'customer_delete_card':
            runTask(customer_task.deleteCard(data), msg, pid, key);
            break;
        case 'customer_get_my_cards':
            runTask(customer_task.getMyCards(data), msg, pid, key);
            break;
        case 'customer_get_new_card_form':
            runTask(customer_task.getNewCardForm(data), msg, pid, key);
            break;
        case 'executor_update_card':
            runTask(executor_task.updateCard(data), msg, pid, key);
            break;
        case 'executor_delete_card':
            runTask(executor_task.deleteCard(data), msg, pid, key);
            break;
        case 'executor_get_my_cards':
            runTask(executor_task.getMyCards(data), msg, pid, key);
            break;
        case 'executor_get_new_card_form':
            runTask(executor_task.getNewCardForm(data), msg, pid, key);
            break;

//----------FOR NOW------------------------------------------------------------------
          case 'find_executor_for_now':
          runTask(order_task.findExecutorForNow(data), msg, pid,  key);
          break;
          case 'ask_executor':
          runTask(order_task.askExecutor(data), msg, pid,  key);
          break;
          case 'find_executor_for_now_timer':
          runTask(order_task.askExecutorTimer(data), msg, pid,  key);
          break;
          case 'executor_accept_order':
          runTask(order_task.executorAcceptOffer(data), msg, pid,  key);
          break;
          case 'executor_decline_order':
          runTask(order_task.executorDeclineOffer(data), msg, pid,  key);
          break;
//-------------------------------------------FOR LATER ---------------------------------------------------
          case 'customer_order_list_for_later':
          runTask(order_task.getOrdersForLater(data), msg, pid,  key);
          break;
// --------------------INVITATIONS ------------------------
          case 'executor_accept_invitation':
          runTask(executor_task.acceptOrganizationInvitation(data), msg, pid,  key);
          break;
          case 'executor_decline_invitation':
          runTask(executor_task.declineOrganizationInvitation(data), msg, pid,  key);
          break;
          case 'executor_leave_organization':
          runTask(executor_task.leaveOrganization(data), msg, pid,  key);
          break;
// --------------------Walltes ------------------------
          case 'executor_get_wallet':
          runTask(executor_task.getWallet(data), msg, pid,  key);
          break;
          case 'executor_create_wallet':
          runTask(executor_task.createWallet(data), msg, pid,  key);
          break;
          case 'executor_update_wallet':
          runTask(executor_task.updateWallet(data), msg, pid,  key);
          break;
          case 'executor_delete_wallet':
          runTask(executor_task.deleteWallet(data), msg, pid,  key);
          break;
//--------------------------------------------------------------------------------------
          case 'find_orders_for_later_time':
          runTask(order_task.findOrdersForFuture(data), msg, pid,  key);
          break;
          case 'get_executor_planned_orders_for_later_time':
          runTask(order_task.getPlannedOrdersForFuture(data), msg, pid,  key);
          break;
          case 'get_executor_offers':
          runTask(order_task.getExecutorOffers(data), msg, pid,  key);
          break;
          case 'get_executor_offer_by_order':
          runTask(order_task.getMyOfferByOrder(data), msg, pid,  key);
          break;
          case 'create_executor_offer':
          runTask(order_task.createOrderOffer(data), msg, pid,  key);
          break;
          case 'approve_executor_offer':
          runTask(order_task.approveExecutorOffers(data), msg, pid,  key);
          break;
          case 'cancel_executor_offer':
          runTask(order_task.cancelOrderOffer(data), msg, pid,  key);
          break;

          case 'cancel_ask_executor_order':
          runTask(order_task.customerCancelAskExecutorOrder(data), msg, pid,  key);
          break;

          case 'on_my_way':
          runTask(order_task.onMyWay(data), msg, pid,  key);
          break;
          case 'cancel_order_for_later':
          runTask(order_task.cancelOrderForLater(data), msg, pid,  key);
          break;
// ------------------------LISTS FOR EXECUTORS---------------------------------------
          case 'address_only_approved_offers_orders':
          runTask(order_task.getAddressOnlyApprovedOffersOrders(data), msg, pid,  key);
          break;
          case 'office_only_approved_offers_orders':
          runTask(order_task.getOfficeOnlyApprovedOffersOrders(data), msg, pid,  key);
          break;
          case 'all_approved_offers_orders':
          runTask(order_task.getAllApprovedOffersOrders(data), msg, pid,  key);
          break;
          case 'address_unoffered_orders':
          runTask(order_task.getAddressUnofferedOrders(data), msg, pid,  key);
          break;
          case 'office_unoffered_orders':
          runTask(order_task.getOfficeUnofferedOrders(data), msg, pid,  key);
          break;
          case 'approved_and_offered_orders':
          runTask(order_task.getApprovedAndOfferedOrders(data), msg, pid,  key);
          break;
// ---------------------------------------------------------------
          case 'get_orders_history':
          runTask(order_task.getOrdersHistory(data), msg, pid,  key);
          break;
          case 'get_order_by_id':
            runTask(order_task.getOrderById(data), msg, pid,  key);
          break;


          case 'cancel_order':
          runTask(order_task.cancelOrder(data), msg, pid,  key);
          break;
          case 'cancel_order_confirm':
          runTask(order_task.cancelOrderConfirm(data), msg, pid,  key);
          break;

          case 'customer_close_order':
          runTask(order_task.customerCloseOrder(data), msg, pid,  key);
          break;



          case 'order_start_work':
          runTask(order_task.startWork(data), msg, pid,  key);
          break;
          case 'order_update_check':
          runTask(order_task.updateOrderCheck(data), msg, pid,  key);
          break;
          case 'order_done':
          runTask(order_task.endWork(data), msg, pid,  key);
          break;
          case 'order_done_confirm':
          runTask(order_task.confirmEndWork(data), msg, pid,  key);
          break;


//-------------------ORDER TIMERS ------------------
          case 'order_timeout_check':
          runTask(order_task.checkNewOrderTimers(data), msg, pid,  key);
          break;
          case 'soon_order_check':
          runTask(order_task.checkSoonOrdersTimer(data), msg, pid,  key);
          break;
//---------------------------------------
          case 'get_list_specialities':
          runTask(speciality_task.getListSpecialities(data), msg, pid,  key);
          break;
          case 'get_list_detailed_specialities':
          runTask(speciality_task.getListDetailedSpecialities(data), msg, pid,  key);
          break;
          case 'get_speciality_detail':
          runTask(speciality_task.getSpecialityDetails(data), msg, pid,  key);
          break;
          case 'get_group_list':
          runTask(speciality_task.getGroupsList(data), msg, pid,  key);
          break;
//--------------------__GLOBAL-------------------
          case 'get_faq':
          runTask(global_task.getFaq(data), msg, pid,  key);
          break;
          case 'get_privacy_policy':
            runTask(global_task.getPrivacyPolicy(data), msg, pid,  key);
            break;
          case 'get_terms_of_conditions':
              runTask(global_task.getTermsOfConditions(data), msg, pid,  key);
              break;
          case 'make_report':
          runTask(global_task.makeReport(data), msg, pid,  key);
          break;
          case 'send_support_request':
          runTask(global_task.makeSupportRequest(data), msg, pid,  key);
          break;
          case 'get_support_requests':
          runTask(global_task.getSupportRequests(data), msg, pid,  key);
          break;
          case 'get_support_requests_count':
          runTask(global_task.getSupportRequestsCount(data), msg, pid,  key);
          break;
          case 'update_support':
          runTask(global_task.updateSupport(data), msg, pid,  key);
          break;

//---------------------------ADMIN-----------------------
          case 'admin_login':
          runTask(admin_task.login(data), msg, pid,  key);
          break;
          case 'admin_counters':
          runTask(admin_task.counters(data), msg, pid,  key);
          break;
          case 'admin_customers_list':
          runTask(admin_task.getCustomersList(data), msg, pid,  key);
          break;
          case 'admin_customers_list_count':
          runTask(admin_task.getCustomersCount(data), msg, pid,  key);
          break;
          case 'admin_customer_update':
          runTask(admin_task.updateCustomer(data), msg, pid,  key);
          break;
          case 'admin_executors_list':
          runTask(admin_task.getExecutorsList(data), msg, pid,  key);
          break;
          case 'admin_executors_count':
          runTask(admin_task.getExecutorsCount(data), msg, pid,  key);
          break;
          case 'admin_add_executor_financial_history':
            runTask(admin_task.addExecutorFinancialHistory(data), msg, pid,  key);
            break;
          case 'admin_executor_fullinfo':
          runTask(admin_task.getExecutorFullInfo(data), msg, pid,  key);
          break;
          case 'admin_executor_order_history':
          runTask(admin_task.getExecutorOrderHistory(data), msg, pid,  key);
          break;
          case 'admin_executor_referral_history':
          runTask(admin_task.getExecutorReferralHistory(data), msg, pid,  key);
          break;
          case 'admin_executor_update':
          runTask(admin_task.updateExecutor(data), msg, pid,  key);
          break;
          case 'admin_executor_financial_history':
          runTask(admin_task.getExecutorFinancialHistory(data), msg, pid,  key);
          break;
          case 'admin_specialites_group_list':
          runTask(admin_task.getSpecialitesGroupList(data), msg, pid,  key);
          break;
          case 'admin_specialites_add_group':
          runTask(admin_task.addSpecialitesGroup(data), msg, pid,  key);
          break;
          case 'admin_specialites_update_group':
          runTask(admin_task.updateSpecialitesGroup(data), msg, pid,  key);
          break;
          case 'admin_specialites_delete_group':
          runTask(admin_task.deleteSpecialitesGroup(data), msg, pid,  key);
          break;
          case 'admin_specialites_list':
          runTask(admin_task.getSpecialitesList(data), msg, pid,  key);
          break;
          case 'admin_specialites_count':
          runTask(admin_task.getSpecialitesCount(data), msg, pid,  key);
          break;
          case 'admin_add_speciality':
          runTask(admin_task.addSpeciality(data), msg, pid,  key);
          break;
          case 'admin_update_speciality':
          runTask(admin_task.updateSpeciality(data), msg, pid,  key);
          break;
          case 'admin_delete_speciality':
          runTask(admin_task.deleteSpeciality(data), msg, pid,  key);
          break;
          case 'admin_promo_list':
          runTask(admin_task.getPromoList(data), msg, pid,  key);
          break;
          case 'admin_promo_count':
          runTask(admin_task.getPromoCount(data), msg, pid,  key);
          break;
          case 'admin_add_promo':
          runTask(admin_task.addPromo(data), msg, pid,  key);
          break;
          case 'admin_delete_promo':
          runTask(admin_task.deletePromo(data), msg, pid,  key);
          break;
          case 'admin_update_promo':
          runTask(admin_task.updatePromo(data), msg, pid,  key);
          break;
          case 'admin_orders_list':
          runTask(admin_task.getOrdersList(data), msg, pid,  key);
          break;
          case 'admin_orders_list_count':
          runTask(admin_task.getOrdersListCount(data), msg, pid,  key);
          break;
          case 'admin_order_fullinfo':
          runTask(admin_task.getOrderFullInfo(data), msg, pid,  key);
          break;
          case 'admin_order_history':
          runTask(admin_task.getOrdersHistory(data), msg, pid,  key);
          break;
          case 'admin_get_config':
          runTask(admin_task.getConfigs(data), msg, pid,  key);
          break;
          case 'admin_update_config':
          runTask(admin_task.updateConfigs(data), msg, pid,  key);
          break;
          case 'admin_disputes_list':
          runTask(admin_task.getDisputesList(data), msg, pid,  key);
          break;
          case 'admin_disputes_count':
          runTask(admin_task.getDisputesCount(data), msg, pid,  key);
          break;
          case 'admin_customer_fullinfo':
          runTask(admin_task.getCustomerFullInfo(data), msg, pid,  key);
          break;
          case 'admin_customer_order_history':
          runTask(admin_task.getCustomerOrderHistory(data), msg, pid,  key);
          break;
          case 'admin_customer_referral_history':
          runTask(admin_task.getCustomerReferralHistory(data), msg, pid,  key);
          break;
          case 'admin_add_customer_financial_history':
          runTask(admin_task.addCustomerFinancialHistory(data), msg, pid,  key);
          break;
          case 'admin_get_reports_list':
          runTask(admin_task.getReportsList(data), msg, pid,  key);
          break;
          case 'admin_get_reports_count':
          runTask(admin_task.getReportsCount(data), msg, pid,  key);
          break;
          case 'admin_update_report':
          runTask(admin_task.updateReport(data), msg, pid,  key);
          break;

          case 'admin_customer_financial_history':
          runTask(admin_task.getCustomerFinancialHistory(data), msg, pid,  key);
          break;
          case 'admin_push_list':
          runTask(admin_task.getPushList(data), msg, pid,  key);
          break;
          case 'admin_push_count':
          runTask(admin_task.getPushCount(data), msg, pid,  key);
          break;
          case 'admin_send_push':
          runTask(admin_task.sendPush(data), msg, pid,  key);
          break;
          case 'admin_send_personal_push':
          runTask(admin_task.sendPersonalPush(data), msg, pid,  key);
          break;
          case 'cron_send_push':
          runTask(admin_task.scriptReturnToApplication(data), msg, pid,  key);
          break;

          // Organization tasks
          case 'organization_login':
          runTask(organization_task.login(data), msg, pid,  key);
          break;
          case 'organization_edit_account':
          runTask(organization_task.editAccount(data), msg, pid,  key);
          break;
          case 'organization_executors_list':
          runTask(organization_task.getExecutorsList(data), msg, pid,  key);
          break;
          case 'organization_invite_executor':
          runTask(organization_task.inviteExecutor(data), msg, pid,  key);
          break;
          case 'organization_executors_check':
          runTask(organization_task.checkExecutor(data), msg, pid,  key);
          break;
          case 'organization_executors_add':
          runTask(organization_task.createExecutor(data), msg, pid,  key);
          break;
          case 'organization_get_history':
          runTask(organization_task.getHistory(data), msg, pid,  key);
          break;
          case 'organization_get_order_history':
          runTask(organization_task.getOrderHistory(data), msg, pid,  key);
          break;


          // End entity tasks
          case 'organization_create_order_offer':
          runTask(organization_task.createOrderOffer(data), msg, pid,  key);
          break;
          case 'organization_get_orders_for_offer':
          runTask(organization_task.getOrdersForOffer(data), msg, pid,  key);
          break;
          case 'organization_get_schedules':
          runTask(organization_task.getSchedules(data), msg, pid,  key);
          break;
          case 'organization_get_executors_for_order_offer':
          runTask(organization_task.getExecutorsForOffer(data), msg, pid,  key);
          break;
          case 'organization_executors_update':
          runTask(organization_task.updateExecutor(data), msg, pid,  key);
          break;
          case 'organization_executor_info':
          runTask(organization_task.getExecutorInfo(data), msg, pid,  key);
          break;
          case 'organization_specialities_list':
          runTask(organization_task.getSpecialitiesList(data), msg, pid,  key);
          break;
          case 'organization_get_order_info':
          runTask(organization_task.getOrderInfo(data), msg, pid,  key);
          break;
          case 'organization_get_list':
          runTask(organization_task.getList(data), msg, pid,  key);
          break;
          case 'organization_get_count':
          runTask(organization_task.getCount(data), msg, pid,  key);
          break;
          case 'organization_update':
          runTask(organization_task.updateOrganization(data), msg, pid,  key);
          break;
          case 'organization_delete':
            runTask(organization_task.deleteOrganization(data), msg, pid,  key);
            break;
          case 'organization_create':
          runTask(organization_task.createOrganization(data), msg, pid,  key);
          break;
          case 'organization_executor_detach':
            runTask(organization_task.detachExecutor(data), msg, pid,  key);
            break;
          case 'organization_executor_attach':
            runTask(organization_task.attachExecutor(data), msg, pid,  key);
            break;
          case 'get_organization_executors':
          runTask(organization_task.getOrganizationExecutors(data), msg, pid,  key);
          break;
          case 'organization_cancel_order_for_later':
          runTask(organization_task.adminCancelOrderForLater(data), msg, pid,  key);
          break;
          case 'qiwi_wpf':
          runTask(qiwi_task.qiwiWPF(data), msg, pid,  key);
          break;
          case 'qiwi_holding':
          runTask(qiwi_task.qiwiHolding(data), msg, pid,  key);
          break;
          case 'qiwi_payout':
          runTask(qiwi_task.qiwiPayout(data), msg, pid,  key);
          break;
          case 'qiwi_refill':
          runTask(qiwi_task.qiwiRefill(data), msg, pid,  key);
          break;

          // End Organization tasks



        /*  case 'send_test_socket':
          amqpLib.publish("", "EndpointQueue",
              new Buffer(
                  JSON.stringify(
                      {
                          action:"socket_message",
                          event:"SOME_SOCKET_EVENT",
                          target_role:"EXECUTOR",
                          target_id:1,
                          data: {text:"some data to send though socket"}
                      }
                  )
              )
          );
          break;*/
        default:
            McCanel.ack(msg);
    }
}

 function runTask(task, msg, pid, key){
  task.then(resp => {
      if(pid && key){
          sendAnswerMessage(key, pid, resp);
      }

      McCanel.ack(msg);
  })
  .catch(err => {
      McCanel.nack(msg);
  });
}

function sendAnswerMessage(key, pid, data, action = "request_response"){
    amqpLib.publish("", "EndpointQueue",
        new Buffer(
            JSON.stringify(
                {
                    action,
                    worker_pid: pid,
                    key: key,
                    data: data
                }
            )
        )
    );
/*    console.log("PUBLISHED ",{
        action,
        worker_pid: pid,
        key: key,
        data: data
    })*/
}


var exports = module.exports = {};
exports.start = start;
exports.setChannel = setChannel;

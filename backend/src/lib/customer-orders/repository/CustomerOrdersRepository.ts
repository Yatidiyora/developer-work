import { col, Op, Sequelize } from 'sequelize';
import { CustomerOrdersDetailsModel, OrderCategoryModel, sequelize } from '../../../common/models/pg';
import { customerOrdersJoinKey } from '../../../common/types/constants/RelationKeysConstants';
import { getCustomLogger } from '../../../common/utils/Logger';

const logger = getCustomLogger('Customer-orders::repository::CustomerOrdersRepository');

export const fetchCustomerOrders = async (props: any) => {
  const { id, size = 10, offset = 0, keyword, sortColumnName, sortOrder } = props;
  try {
    CustomerOrdersDetailsModel.belongsTo(OrderCategoryModel, customerOrdersJoinKey);
    return await CustomerOrdersDetailsModel.findAndCountAll({
      attributes: [
        'id',
        'customerId',
        'orderCategoryId',
        'orderName',
        'orderSerialNumber',
        'orderDeliveryAddress',
        'orderDeliveryStatus',
        'orderPrice',
        'createdAt',
        'updatedAt',
        [col('OrderCategoryModel.id'), 'orderId'],
        [col('OrderCategoryModel.order_category_type'), 'orderCategoryType'],
        [col('OrderCategoryModel.sub_category_type'), 'subCategoryType'],
      ],
      where: {
        [Op.or]: [
          // Add dynamic conditions from the second model (Order)
          ...['order_category_type'].map((field) =>
            Sequelize.where(Sequelize.col(`OrderCategoryModel.${field}`), { [Op.like]: `%${keyword ?? ''}%` }),
          ),
          ...['orderName', 'orderSerialNumber'].map((field) => ({
            [field]: { [Op.like]: `%${keyword ?? ''}%` },
          })),
        ],
        customerId: id,
      },
      include: [
        {
          model: OrderCategoryModel,
          attributes: [], // Select specific fields from orders
          required: true,
        },
      ],
      order: [
        ['orderCategoryType','subCategoryType'].includes(sortColumnName)
          ? [{ model: OrderCategoryModel, as: 'OrderCategoryModel' }, sortColumnName, sortOrder]
          : [sortColumnName, sortOrder],
      ],
      limit: size,
      offset,
      raw: true,
      logging: true,
    });
  } catch (error) {
    logger.error('Failed to fetch customer orders details', error.message || error);
    throw error;
  }
};

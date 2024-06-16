"use strict";
const portfolioUser = require("../../models").PortfolioUser;
const modelReponse = require("../../services/utils/responses");

module.exports = {

  /*
    Create a new user
    POST /portfoliouser/
    body:{
      avatar: string;
      lastName: string;
      firstName: string;
      fullName: string;
      skills: number;
      city: string;
      street: string;
      email: string;
      rating: number;
      income: string;
    }
  */
  async create(req, res) {
    try {
      console.log(req.body);
      const portfolioUserResult = await portfolioUser.create({
        avatar: req.body.avatar,
        last_name: req.body.lastName,
        first_name: req.body.firstName,
        full_name: req.body.fullName,
        skills: req.body.skills,
        city: req.body.city,
        street: req.body.street,
        email: req.body.email,
        rating: req.body.rating,
        income: req.body.income,
      });
      return modelReponse.sucess_Ok(res)("Portfolio User created correctly", {
        portfolioUser: portfolioUserResult,
      });
    } catch (error) {
      return modelReponse.internal_server(res)(error.message);
    }
  },
  /*
    Update user
    PUT | PATCH /portfoliouser/:portfolioUserId
    body:{
      avatar: string;
      lastName: string;
      firstName: string;
      fullName: string;
      skills: number;
      city: string;
      street: string;
      email: string;
      rating: number;
      income: string;
    }
  */
  async update(req, res) {
    try {
      const portfolioUserResult = await portfolioUser.findOne({
        where: {
          id: req.params.portfolioUserId
        }
      });
      if (!portfolioUserResult) {
        return modelReponse.sucess_not_found(res)("Portfolio user not found");
      }
      await portfolioUserResult.update({
        avatar: req.body.avatar || portfolioUserResult.avatar,
        last_name: req.body.lastName || portfolioUserResult.last_name,
        first_name: req.body.firstName || portfolioUserResult.first_name,
        full_name: `${req.body.firstName || portfolioUserResult.first_name} ${req.body.lastName || portfolioUserResult.last_name}`,
        skills: req.body.skills || portfolioUserResult.skills,
        city: req.body.city || portfolioUserResult.city,
        street: req.body.street || portfolioUserResult.street,
        email: req.body.email || portfolioUserResult.email,
        rating: req.body.rating || portfolioUserResult.rating,
        income: req.body.income || portfolioUserResult.income,
      });
      return modelReponse.sucess_Ok(res)("Portfolio User updated correctly", {
        portfolioUser: portfolioUserResult,
      });
    } catch (error) {
      return modelReponse.internal_server(res)(error.message);
    }
  },
  /*
    Retrieve portfolio User
    GET /portfoliouser/:portfolioUserId
  */
  async byId(req, res) {
    try {
      const portfolioUserResult = await portfolioUser.findOne({
        where: {
          id: req.params.portfolioUserId
        }
      });
      if (!portfolioUserResult) {
        return modelReponse.sucess_not_found(res)("Portfolio user not found");
      }

      return modelReponse.sucess_Ok(res)("Portfolio User", {
        portfolioUser: portfolioUserResult,
      });
    } catch (error) {
      return modelReponse.internal_server(res)(error.message);
    }
  },
  /*
    Get all portfolio Users, pagination is optional
    GET /portfoliouser/?perPage=10&page=1
  */
  async list(req, res) {
    try {
      let hasPagination = false;
      const { perPage, page } = req.query;
      let query = {};

      if (page && perPage) {
        const offset = (page - 1) * perPage;
        query = {
          limit: parseInt(perPage),
          offset: parseInt(offset)
        };
        hasPagination = true;
      }

      const { count, rows } = await portfolioUser.findAndCountAll(query);
      return modelReponse.sucess_Ok(res)("Portfolio Users list", {
        total: count,
        pages: hasPagination ? Math.ceil(count / perPage) : 0,
        page: hasPagination ? parseInt(page) : 0,
        portfolioUsers: rows
      });
    } catch (error) {
      return modelReponse.internal_server(res)(error.message);
    }
  },
  /*
    Remove a portfolio User
    DELETE /portfoliouser/:portfolioUserId
  */
    async destroy(req, res) {
      try {
        const { portfolioUserId } = req.params;
        const result = await portfolioUser.destroy({ where: { id: portfolioUserId } });

        if (!result) {
          return modelReponse.sucess_not_found(res)("Portfolio user not found");
        }

        return modelReponse.sucess_Ok(res)(`Portfolio user with id ${portfolioUserId} deleted successfully`);
      } catch (error) {
        return modelReponse.internal_server(res)(error.message);
      }
    },
};
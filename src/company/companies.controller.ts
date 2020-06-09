import { Controller, Get, ValidationPipe } from "@nestjs/common";
import { Override, Crud, CrudController, ParsedRequest, CrudRequest} from "@nestjsx/crud";

import { Company } from "./company.entity";
import { CompaniesService } from "./companies.service";

@Crud({
  model: {
    type: Company,
  },
  // query: {
  //   exclude: ['description']
  // },

  // serialize:{
  //   getMany: false,
  // },
  params: {
    companyId: {
      field: 'companyId',
      type: 'number',
      primary: true,
    }
  },
  validation: {
    transform: true,
    
  }
})
@Controller("companies")
export class CompaniesController implements CrudController<Company> {
  constructor(public service: CompaniesService) {

  }
  get base(): CrudController<Company> {
    return this;
  }

  
  getMany(
    @ParsedRequest() req: CrudRequest,
  ) {
    console.log("overide get many")
    if (req)
      return this.base.getManyBase(req);
    return;
  }
}
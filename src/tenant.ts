import {
  HostComponentInfo,
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
} from '@nestjs/core';
import { Request } from 'express';

const tenants = new Map<string, ContextId>();

export class TenantContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    const tenant = request.headers['x-tenant'] as string;
    let tenantSubTreeId: ContextId;

    if (tenants.has(tenant)) {
      tenantSubTreeId = tenants.get(tenant);
    } else {
      tenantSubTreeId = ContextIdFactory.create();
      tenants.set(tenant, tenantSubTreeId);
    }

    return {
      resolve: (info: HostComponentInfo) => {
        return info.isTreeDurable ? tenantSubTreeId : contextId;
      },
      payload: { tenant },
    };
  }
}

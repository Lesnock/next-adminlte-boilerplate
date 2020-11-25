import React from 'react'
import router from 'next/router'

import { ReactProps } from '../../types'
import Breadcrumb from '../Breadcrumb'

type BreadcrumbItem = {
  name: string
  link?: string
  active?: boolean
}

type PageContentProps = {
  title?: string
  breadcrumb?: BreadcrumbItem[]
}

export default function PageContent({
  children,
  title = router.pathname,
  breadcrumb
}: ReactProps & PageContentProps) {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{title}</h1>
            </div>
            <div className="col-sm-6">
              {breadcrumb && <Breadcrumb items={breadcrumb} />}
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="row">{children}</div>
        </div>
      </div>
    </div>
  )
}

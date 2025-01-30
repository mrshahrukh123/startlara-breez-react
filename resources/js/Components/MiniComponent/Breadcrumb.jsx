import React from 'react'

export default function Breadcrumb({ breadcrumbFirst = "", breadcrumbSecond = "" }) {
  return (
    <>
        <h6 className="pe-3">{breadcrumbFirst}</h6>
          <div className="ps-3">
              <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item active" aria-current="page">
                  {breadcrumbSecond}
                  </li>
                  </ol>
              </nav>
          </div>
    </>
  )
}

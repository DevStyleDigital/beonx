/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { GridColDef } from '@mui/x-data-grid';
import { TableActions } from 'components/Table/TableActions';
import { useRouter } from 'next/navigation';
import { http } from 'services/http';

export const stepSelectColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  { field: 'input_name', headerName: 'Input/Select name', width: 150, editable: false },
  { field: 'type', headerName: 'Type', width: 90, editable: false },
  { field: 'group', headerName: 'Group', width: 90, editable: false },
  // {
  //   field: 'options_amount',
  //   headerName: 'Options amount',
  //   width: 125,
  //   editable: false,
  // },
  { field: 'total_size', headerName: 'Total size', width: 90, editable: false },
  {
    field: 'actions',
    headerName: '',
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const router = useRouter();

      return (
        <TableActions
          onClickDelete={async () => {
            if (
              confirm(
                "Did you really want remove this item?\n\nThis action can't be reverse!",
              )
            ) {
              await http.delete(`/api/inputs/${params.id}`);
              alert('This select was deleted from database');
            }
          }}
          onClickEdit={() =>
            router.push(`admin/dash/steps/${params.row.step}/edit/${params.id}`)
          }
        />
      );
    },
  },
];

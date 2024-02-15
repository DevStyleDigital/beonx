"use client";
import { IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { EditIcon, TrashIcon } from "components/Icons";

export const TableActions = ({
	onClickDelete,
	onClickEdit,
}: {
	onClickDelete?: () => void;
	onClickEdit?: () => void;
}) => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<IconButton onClick={() => onClickEdit?.()}>
				<EditIcon />
			</IconButton>
			<IconButton onClick={() => onClickDelete?.()}>
				<TrashIcon />
			</IconButton>
		</div>
	);
};

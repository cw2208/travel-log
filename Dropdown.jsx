import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from 'lucide-react';
import { Link } from "react-router-dom";

export function DropdownMenu() {

    // The following content was assisted by AI.
    return (
        <div className="dropdown">
            <DropdownMenuPrimitive.Root>
                <DropdownMenuPrimitive.Trigger className="trigger">
                    <MoreVertical />
                </DropdownMenuPrimitive.Trigger>
                <DropdownMenuPrimitive.Content className="content">
                    <DropdownMenuPrimitive.Item className="item edit-log"><Link className='link' to='#'>Edit Log</Link></DropdownMenuPrimitive.Item>
                    <DropdownMenuPrimitive.Item className="item delete-log"><Link className='link' to='#'>Delete Log</Link></DropdownMenuPrimitive.Item>
                    <DropdownMenuPrimitive.Item className="item move-log"><Link className='link' to='/move-to'>Move to...</Link></DropdownMenuPrimitive.Item>
                </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Root>
        </div>
    );
}

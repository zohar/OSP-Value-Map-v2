import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { FeatureMap } from '@/types/database';
import React from 'react';

interface FeatureTableProps {
  featureMap: FeatureMap;
}

export function FeatureTable({ featureMap }: FeatureTableProps) {
  if (!featureMap?.featuresMap) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No feature map data available
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableBody>
          {featureMap.featuresMap.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <TableRow className="bg-featureMap-category hover:bg-featureMap-category">
                <TableCell className="font-bold text-featureMap-categoryForeground w-48">
                  Feature Category
                </TableCell>
                <TableCell className="text-featureMap-categoryForeground">
                  {category.category}
                </TableCell>
              </TableRow>
              
              {category.areas.map((area, areaIndex) => (
                <React.Fragment key={`${categoryIndex}-${areaIndex}`}>
                  <TableRow className="bg-featureMap-area hover:bg-featureMap-area">
                    <TableCell className="pl-8 font-medium text-featureMap-areaForeground">
                      Feature Area
                    </TableCell>
                    <TableCell className="text-featureMap-areaForeground">
                      {area.name}
                    </TableCell>
                  </TableRow>
                  
                  {area.features.map((feature, featureIndex) => (
                    <TableRow 
                      key={`${categoryIndex}-${areaIndex}-${featureIndex}`}
                      className="bg-featureMap-feature hover:bg-muted/50"
                    >
                      <TableCell className="pl-16 text-muted-foreground">Feature</TableCell>
                      <TableCell>{feature}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}